---
sort: 6
---

## 1. Introduction to Document NoSQL Databases

A Document database organizes information into documents. Each document contains fields and values, including nested objects, arrays, and other structures supported by the provider. Documents are frequently represented with JSON-like structures, but the physical representation depends on the database.

### Why Choose a Document Database?

* **Flexible structure:** documents of the same collection can evolve and differ in shape.
* **Hierarchical data:** nested objects and collections are represented naturally.
* **Attribute queries:** fields inside documents can be queried, and many databases can index them.
* **Domain-friendly mapping:** an aggregate of Java objects often maps directly to one document.
* **Fewer joins:** embedding related information can reduce application-side joins.

Typical use cases include:

* Product catalogs
* Content management
* Customer profiles
* Order management
* Event metadata
* Applications with evolving schemas

### Trade-offs

Flexibility does not remove the need for data modeling, and Document databases are not inherently faster, more scalable, or schema-free. Consider:

* Duplicated data and how to keep it consistent when it changes.
* Documents that grow over time.
* Embedded documents versus references to other documents.
* Which indexes to create and maintain.
* Differences in query and aggregation capabilities.
* Transaction capabilities, which vary by database.
* Schema validation, which is provider-specific when available.

The right model depends on your access patterns and application requirements.

## 2. Minimum Requirements

Before you start, make sure your application meets the common [Minimum Requirements](/docs/minimum.html) of Eclipse JNoSQL™. The Document API follows these common requirements, although the database integration you choose may introduce additional dependencies or configuration.

## 3. Choosing a Document NoSQL Database

Eclipse JNoSQL integrates with multiple Document databases through provider implementations. Choose one according to your actual requirements, such as:

* Query capabilities
* Indexing
* Aggregation
* Transactions and consistency
* Horizontal scaling
* Durability
* Serialization
* Operational complexity
* Cloud and deployment support

JNoSQL helps decouple your Java code from specific database drivers, but it does not guarantee identical behavior across providers.

### Supported Databases

The provider list is maintained in the [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) repository. See also the [Supported Databases](/docs/supported_dbs.html) page.

## 4. Adding the Eclipse JNoSQL™ Dependency

This guide uses MongoDB as the representative integration. Add the following dependency to your Maven project:

```xml
<dependency>
    <groupId>org.eclipse.jnosql.databases</groupId>
    <artifactId>jnosql-mongodb</artifactId>
    <version>{{ site.jnosql_databases_version }}</version>
</dependency>
```

You can replace it with another supported Document provider. Changing the dependency alone does not guarantee identical behavior; see [Serialization and Database-Specific Capabilities](#10-serialization-and-database-specific-capabilities).

## 5. Configuring the Database

Eclipse JNoSQL uses [MicroProfile Config](https://microprofile.io/specifications/microprofile-config/), so properties can come from `META-INF/microprofile-config.properties`, environment variables, or system properties.

### Common JNoSQL Configuration

These properties select the database and, when needed, the provider:

* `jnosql.document.database`: the database (or schema) name.
* `jnosql.document.provider`: the provider's configuration class. It is only necessary when more than one Document integration is on the classpath, so JNoSQL knows which one to use.

### Provider-Specific Configuration

Other properties belong to the database implementation, such as host, port, authentication, and connection parameters. For MongoDB:

```properties
jnosql.document.database=store
jnosql.mongodb.host=localhost:27017
```

The MongoDB integration also reads properties such as `jnosql.mongodb.user`, `jnosql.mongodb.password`, `jnosql.mongodb.url`, `jnosql.mongodb.authentication.source`, and `jnosql.mongodb.authentication.mechanism`. Do not hardcode credentials: supply them through environment variables or your secrets management. For the full property list of each database, see the [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) documentation.

## 6. Mapping Java Objects to Documents

Jakarta NoSQL maps a Java class to a document through annotations: `@Entity` marks the class, `@Id` the identifier, and `@Column` each persistent field. Entities need a non-private constructor without parameters. No extra libraries such as Lombok are required.

```java
import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;

import java.math.BigDecimal;
import java.util.List;

@Entity
public class Product {

    @Id
    private String id;

    @Column
    private String name;

    @Column
    private BigDecimal price;

    @Column
    private List<String> tags;

    @Column
    private ProductDetails details;

    Product() {
    }

    public Product(String id, String name, BigDecimal price,
                   List<String> tags, ProductDetails details) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.tags = tags;
        this.details = details;
    }

    public String getId() { return id; }

    public String getName() { return name; }

    public BigDecimal getPrice() { return price; }

    public List<String> getTags() { return tags; }

    public ProductDetails getDetails() { return details; }
}
```

The nested object is a class annotated with `@Embeddable`. Using `@Embeddable(Embeddable.EmbeddableType.GROUPING)` stores it as a sub-document under the field name; the default `FLAT` type instead stores its fields directly in the owning document.

```java
import jakarta.nosql.Column;
import jakarta.nosql.Embeddable;

@Embeddable(Embeddable.EmbeddableType.GROUPING)
public class ProductDetails {

    @Column
    private String manufacturer;

    @Column
    private int warrantyMonths;

    ProductDetails() {
    }

    public ProductDetails(String manufacturer, int warrantyMonths) {
        this.manufacturer = manufacturer;
        this.warrantyMonths = warrantyMonths;
    }

    public String getManufacturer() { return manufacturer; }

    public int getWarrantyMonths() { return warrantyMonths; }
}
```

Collections of simple values (such as `List<String>`) are stored as arrays, and collections of embeddable or entity types are stored as arrays of nested documents. Conceptually, a product is represented as:

```json
{
  "id": "p-1",
  "name": "Mechanical Keyboard",
  "price": 89.90,
  "tags": ["electronics", "accessories"],
  "details": {
    "manufacturer": "ExampleTech",
    "warrantyMonths": 24
  }
}
```

This JSON shows the conceptual structure, not the exact physical representation produced by every provider. For example, the identifier field can be stored under a different name (MongoDB uses `_id`).

## 7. DocumentTemplate and the Template API

Jakarta NoSQL defines `jakarta.nosql.Template` as the common persistence abstraction. `DocumentTemplate` (`org.eclipse.jnosql.mapping.document.DocumentTemplate`) is the specialization for Document persistence: it extends `SemiStructuredTemplate`, which in turn extends `Template`.

| Interface | Role |
|-----------|------|
| `Template` | Common operations: insert, update, find by identifier, delete, and query. |
| `SemiStructuredTemplate` | Operations shared by the semi-structured models (Document, Wide-Column, Graph, Time Series, Vector), such as `count`, `findAll`, and `singleResult`. |
| `DocumentTemplate` | The Document-specific entry point to inject; it keeps the familiar `Template` concepts while allowing document-oriented capabilities. |

Inject it with CDI:

```java
import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.jnosql.mapping.document.DocumentTemplate;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProductService {

    @Inject
    DocumentTemplate template;

    public void crud() {
        Product product = new Product("p-1", "Mechanical Keyboard",
                new BigDecimal("89.90"), List.of("electronics", "accessories"),
                new ProductDetails("ExampleTech", 24));

        template.insert(product);

        Optional<Product> found = template.find(Product.class, "p-1");

        Product updated = new Product("p-1", "Mechanical Keyboard",
                new BigDecimal("79.90"), List.of("electronics", "accessories"),
                new ProductDetails("ExampleTech", 24));
        template.update(updated);

        template.delete(Product.class, "p-1");
    }
}
```

* `insert` stores a new entity.
* `update` replaces the stored state of an existing entity.
* `find` returns an `Optional` by identifier.
* `delete(Class, id)` removes it by identifier.

The exact behavior when inserting an existing identifier or updating a missing one depends on the provider, so do not assume identical semantics across databases.

## 8. Fluent API — Expressive Document Queries

Document databases usually expose their own query languages, query documents, driver APIs, or query builders. When an application uses several database technologies, this increases the learning curve and couples application code to driver-specific constructs.

Eclipse JNoSQL provides a Fluent API, defined by Jakarta NoSQL, to express supported queries as Java method chains. Its benefits include:

* Readability and less query-construction boilerplate.
* Consistent programming patterns across database models.
* Composable conditions.
* Integration with mapped Java entities, so you use attribute names of the entity.
* Sorting and limiting operations.
* Less dependence on driver-specific query construction.

The Fluent API does not make all query engines equivalent: the integration adapts supported operations to the selected database.

### Fluent Select

```java
List<Product> products = template.select(Product.class)
        .where("price").gte(new BigDecimal("50.00"))
        .orderBy("name").asc()
        .limit(10)
        .result();
```

1. `select(Product.class)` starts a query over the `Product` entity.
2. `where("price").gte(...)` adds a condition on the mapped attribute.
3. `orderBy("name").asc()` sorts the results.
4. `limit(10)` caps the number of results.
5. `result()` executes the query and returns a `List<Product>`. Terminal operations also include `stream()`, `singleResult()`, and `count()`.

### Multiple Conditions

Combine predicates with `and()` or `or()`:

```java
List<Product> products = template.select(Product.class)
        .where("price").gte(new BigDecimal("50.00"))
        .and("price").lte(new BigDecimal("100.00"))
        .orderBy("price").asc()
        .result();
```

### Fluent Update

```java
template.update(Product.class)
        .set("price").to(new BigDecimal("79.90"))
        .where("id").eq("p-1")
        .execute();
```

`set(...).to(...)` can be repeated to change several attributes. Conditional updates are part of the Jakarta NoSQL API, but whether and how they run depends on the provider and its `DocumentTemplate` implementation; check your provider's documentation before relying on them.

### Fluent Delete

```java
template.delete(Product.class)
        .where("price").lt(new BigDecimal("10.00"))
        .execute();
```

Conditional and bulk operations can vary by provider.

### Important Architectural Explanation

The Fluent API gives you a common Java programming model. JNoSQL turns the chain into a database-neutral query, and the integration translates what it supports into the native query of the selected database. Not every provider supports every operator, nested-field expression, update operation, or indexing feature.

## 9. Querying Nested Document Data

Nested objects are a major advantage of document modeling. In the `Product` entity, `ProductDetails` is a nested object. Where the provider supports it, a nested attribute is addressed by its path from the entity attribute:

```java
List<Product> products = template.select(Product.class)
        .where("details.manufacturer").eq("ExampleTech")
        .result();
```

This form is exercised by JNoSQL's mapping tests for embedded and sub-entity attributes. It is not a portable guarantee: nested-field support and the path syntax depend on the database integration and on how the nested class is mapped (`FLAT` versus `GROUPING`). Consult the [provider documentation](https://github.com/eclipse-jnosql/jnosql-databases) for nested queries, array queries, aggregation, and indexing.

## 10. Serialization and Database-Specific Capabilities

JNoSQL maps Java objects with its mapping APIs, while each database integration determines how the information is represented and persisted. Providers may use:

* JSON, BSON, or another document representation.
* Native driver conversion.
* Custom codecs.
* Provider-specific data types.
* Different mappings for identifiers.
* Different handling of null or missing attributes.

The same Java entity therefore does not guarantee an identical physical document across databases. Verify details in your provider's documentation.

### Portability Considerations

Switching Document providers can require changes to:

* Dependencies.
* Connection settings.
* Index definitions.
* Query capabilities.
* Serialization.
* Data migration.
* Transaction and consistency behavior.

JNoSQL reduces unnecessary driver coupling while preserving access to provider-specific functionality.

## 11. Using Jakarta Data Repositories

Jakarta Data provides a declarative, repository-oriented persistence model. Using the same `Product` entity:

```java
import jakarta.data.repository.BasicRepository;
import jakarta.data.repository.Repository;

import java.util.List;

@Repository
public interface ProductRepository
        extends BasicRepository<Product, String> {

    List<Product> findByName(String name);
}
```

`findByName` is a derived query: the method name defines the query. Inject and use it:

```java
@Inject
ProductRepository repository;

public void usage() {
    repository.save(new Product("p-1", "Mechanical Keyboard",
            new BigDecimal("89.90"), List.of("electronics"),
            new ProductDetails("ExampleTech", 24)));

    Optional<Product> product = repository.findById("p-1");
    List<Product> byName = repository.findByName("Mechanical Keyboard");

    repository.deleteById("p-1");
}
```

Document databases commonly offer richer query capabilities than basic Key-Value databases, but the supported operators remain provider-dependent.

### Repository Versus Template

The two APIs are complementary:

* **Jakarta Data repository:** declarative persistence operations and repository-oriented design.
* **`DocumentTemplate`:** explicit persistence operations and flexible query construction.

Neither is universally better; applications can use both.

## 12. Document Databases and Jakarta Query

In the Jakarta EE data-access architecture, Jakarta NoSQL provides the mapping and document persistence, and Jakarta Data provides repository abstractions. [Jakarta Query](https://github.com/jakartaee/query) is a common query foundation for Jakarta persistence technologies; its integration into Eclipse JNoSQL is under development and should not be assumed to be available. See the [Introduction](/docs/introduction.html) for the overall picture.

## 13. Explore Document Database Integrations

This guide introduces the common Document persistence model and JNoSQL programming APIs. For database-specific configuration, indexing, serialization, and native capabilities, see the [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) repository.

* [Supported Databases](/docs/supported_dbs.html)
* [Jakarta NoSQL](https://github.com/jakartaee/nosql)
* [Jakarta Data](https://github.com/jakartaee/data)
* JNoSQL examples: [demos-se](https://github.com/JNOSQL/demos-se) and [demos-ee](https://github.com/JNOSQL/demos-ee)
