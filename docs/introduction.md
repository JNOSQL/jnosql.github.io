---
sort: 1
---

# Introduction

Eclipse JNoSQL™ is a Java framework that implements [Jakarta NoSQL](https://github.com/jakartaee/nosql) and [Jakarta Data](https://github.com/jakartaee/data), with integration of [Jakarta Query](https://github.com/jakartaee/query) under development. It supports six NoSQL database models: **Key-Value**, **Document**, **Wide-Column**, **Graph**, **Time Series**, and **Vector**.

Standardized Java APIs let an application use several kinds of NoSQL databases (polyglot persistence) with a consistent programming model: CDI-based injection, entity mapping, repositories, and templates. Not every database supports the same query operations or persistence semantics, so JNoSQL provides a common foundation plus model-specific APIs rather than a single universal interface.

New to the requirements? See the [Minimum Requirements](/docs/minimum.html).

## Object Mapping

Jakarta NoSQL defines its own mapping semantics for NoSQL databases. Entities are plain Java classes described with a small set of annotations:

```java
@Entity
public class Product {

    @Id
    private String id;

    @Column
    private String name;

    @Column
    private BigDecimal price;

    // constructors, getters, and setters
}
```

* `@Entity` marks the class as persistable.
* `@Id` identifies the attribute used as the entity's identifier (the key, in a Key-Value database).
* `@Column` marks an attribute to be persisted.

This abstraction lets the same entity be persisted across supported database implementations, subject to provider capabilities and the differences between data models. See [Annotations](/docs/annotations.html) for the complete list.

## Jakarta Data Repositories

A Jakarta Data repository is an interface whose implementation is provided by Eclipse JNoSQL:

```java
@Repository
public interface ProductRepository extends BasicRepository<Product, String> {

    List<Product> findByName(String name);
}
```

```java
@Inject
ProductRepository repository;

repository.save(new Product("p-1", "Keyboard", new BigDecimal("49.90")));

Optional<Product> byId = repository.findById("p-1");
List<Product> byName = repository.findByName("Keyboard");
```

`BasicRepository` provides common operations such as `save`, `findById`, and `deleteById`, while `findByName` is a derived query built from the method name. Support for queries beyond lookup by identifier depends on the capabilities of the underlying database model and provider; a Key-Value database, for instance, does not generally support querying by arbitrary attributes.

## The Template API

`jakarta.nosql.Template` is the common foundation for persistence operations in Jakarta NoSQL:

```java
@Inject
Template template;

Product product = new Product("p-1", "Keyboard", new BigDecimal("49.90"));

template.insert(product);

Optional<Product> result = template.find(Product.class, "p-1");
```

Eclipse JNoSQL provides specialized templates that expose model-specific capabilities without forcing every database model into one universal interface:

| Template | Model | Relationship |
|---|---|---|
| `KeyValueTemplate` | Key-Value | extends `Template` |
| `DocumentTemplate` | Document | extends `SemiStructuredTemplate` |
| `ColumnTemplate` | Wide-Column | extends `SemiStructuredTemplate` |
| `GraphTemplate` | Graph | extends `SemiStructuredTemplate` |
| `TimeSeriesTemplate` | Time Series | extends `SemiStructuredTemplate` |
| `VectorTemplate` | Vector | extends `SemiStructuredTemplate` |

`SemiStructuredTemplate` itself extends `Template`, so every template shares the common operations. The hierarchies are not identical: `KeyValueTemplate` extends `Template` directly.

## Fluent API: Simplifying NoSQL Queries

Querying NoSQL databases becomes complicated when an application uses more than one technology. Each database exposes its own query language, driver, query builder, and operational semantics, so without a common abstraction developers must learn and maintain a different query-construction mechanism per integration.

Eclipse JNoSQL addresses this with a fluent Java query API integrated with Jakarta NoSQL's `Template`. Its main benefits are:

* **Expressiveness:** queries are readable Java method chains.
* **Consistency:** familiar operations are reused across supported NoSQL integrations.
* **Productivity:** less boilerplate than building database-specific query objects.
* **Composability:** filters, ordering, limits, and other supported operations can be combined.
* **Integration:** you query mapped Java entities instead of converting results into domain objects by hand.
* **Extensibility:** specialized, database-specific operations remain available when needed.

The Fluent API simplifies development; it does not make all NoSQL query languages interchangeable.

### Selecting entities

```java
@Inject
Template template;

List<Product> products = template.select(Product.class)
        .where("price").gte(new BigDecimal("100.00"))
        .orderBy("name").asc()
        .limit(10)
        .result();
```

This query selects `Product` entities, filters them by price, orders the results by name, limits the result size, and returns mapped `Product` instances.

### Composing conditions

```java
List<Product> products = template.select(Product.class)
        .where("name").like("Keyboard%")
        .and("price").lte(new BigDecimal("150.00"))
        .result();
```

Conditions are combined with `and` and `or`. The available operators (`eq`, `gt`, `gte`, `lt`, `lte`, `like`, `between`, `in`, among others) are defined by Jakarta NoSQL, but which of them a database can execute, and how, depends on the provider.

### Deleting entities

```java
template.delete(Product.class)
        .where("price").lt(new BigDecimal("10.00"))
        .execute();
```

The same style retrieves and deletes data. Bulk operations may have different semantics and limitations across providers.

### Relationship with Jakarta Data

Jakarta Data repositories and the Fluent API are complementary; neither universally replaces the other.

**Jakarta Data repository** — ideal for declaring common operations on an interface:

```java
List<Product> findByName(String name);
```

**Jakarta NoSQL Fluent API** — useful when the application needs explicit query construction:

```java
template.select(Product.class)
        .where("name").eq("Keyboard")
        .result();
```

Repositories favor declarative persistence, while the Fluent API gives direct control over supported query construction. Templates also cover model-specific operations through specialized templates.

### Database abstraction

Applications express query intent through Java APIs, and the implementation adapts the supported operations to the underlying database. Document and Wide-Column databases, for instance, may use different native query mechanisms, and not every operation is available for every database type. Many Key-Value databases primarily support identifier-based operations rather than filtering by arbitrary attributes.

### Specialized fluent operations

The fluent style also appears in specialized models. The Vector API adds similarity-oriented operations:

```java
List<Article> articles = vectorTemplate.search(Article.class)
        .vector(queryVector)
        .limit(Limit.of(10))
        .result();
```

The common style keeps the API familiar while allowing model-specific capabilities. See [Six Database Models in Action](#vector) for the Vector API.

Jakarta Query is intended as a common query foundation for Jakarta persistence technologies, and its integration in Eclipse JNoSQL is under development. The fluent APIs above are not implementations of Jakarta Query.

## NoSQL-Specific Capabilities

NoSQL databases expose capabilities that generic repository abstractions may not represent. Time to live (TTL) is a concise example:

```java
template.insert(product, Duration.ofMinutes(10));
```

Expiration is useful for caching and temporary application data. However, TTL behavior depends on the provider, and databases do not implement expiration in the same way. Some capabilities require specialized templates or extensions; for example, `KeyValueTemplate` offers `put(entity, ttl)`.

## Six Database Models in Action

The examples below are intentionally short. Each model has its own guide or section for details.

### Key-Value

Key-Value databases associate a unique key with a value and are accessed by identifier. They are useful for caching, sessions, and fast lookups.

```java
@Inject
KeyValueTemplate template;

template.put(session);
Optional<UserSession> found = template.get("s-1", UserSession.class);
template.deleteByKey("s-1");
```

Read more in the [Key-Value guide](/docs/key-value.html).

### Document

Document databases persist flexible, document-oriented data such as product catalogs, content, and user profiles.

```java
@Inject
DocumentTemplate template;

template.insert(product);
List<Product> keyboards = template.select(Product.class)
        .where("name").eq("Keyboard")
        .result();
```

Read more in the [Document guide](/docs/document.html).

### Wide-Column

Wide-column databases store data in distributed column families, suited to large datasets and high-throughput workloads.

```java
@Inject
ColumnTemplate template;

template.insert(product);
Optional<Product> found = template.find(Product.class, "p-1");
```

Query capabilities vary between Cassandra-style databases and other column-oriented integrations. Read more in the [Wide-Column guide](/docs/column.html).

### Graph Persistence

Eclipse JNoSQL provides `GraphTemplate` and graph-oriented mapping for relationship-oriented data, such as recommendations or fraud analysis. Relationships are modeled as edges between entities:

```java
@Inject
GraphTemplate graphTemplate;

Edge<Person, Book> edge = Edge.source(person)
        .label("READS")
        .target(book)
        .property("since", 2026)
        .build();

graphTemplate.edge(edge);
```

[Apache TinkerPop](https://tinkerpop.apache.org/) is an important graph technology in this ecosystem, but it is not the whole of the Graph architecture: JNoSQL can integrate with different graph database providers, whose capabilities may vary. Read more in the [Graph guide](/docs/graph.html) and the [supported databases](/docs/supported_dbs.html).

### Time Series

`TimeSeriesTemplate` supports time-indexed data, valuable for monitoring, financial operations, and event processing.

```java
@Entity
public class SensorReading {

    @Id
    private Instant timestamp;

    @Column
    private String sensor;

    @Column
    private double value;
}

@Inject
TimeSeriesTemplate template;

template.insert(reading);
Optional<SensorReading> found = template.find(SensorReading.class, reading.getTimestamp());
```

See the [Time Series section](https://github.com/eclipse-jnosql/jnosql/blob/main/README.adoc#time-series) of the Eclipse JNoSQL README.

### Vector

`VectorTemplate` adds vector similarity search to the regular Jakarta NoSQL operations. Vectors can represent semantic embeddings or other numerical feature representations, with `DenseVector`, `SparseVector`, and `MultiVector` available. The framework handles persistence and search integration; it does not generate embeddings.

```java
@Inject
VectorTemplate vectorTemplate;

Vector queryVector = DenseVector.of(0.10F, 0.42F, 0.80F);

List<Article> articles = vectorTemplate.search(Article.class)
        .vector(queryVector)
        .limit(Limit.of(10))
        .result();
```

Here `Article` is an entity with a persisted attribute of type `Vector`. See the [Vector Database section](https://github.com/eclipse-jnosql/jnosql/blob/main/README.adoc#vector-database) of the Eclipse JNoSQL README for entity mapping and configuration.

## Database Flexibility Without Hiding Differences

Eclipse JNoSQL reduces unnecessary coupling between your application and specific database drivers. Providers can still differ in:

* Serialization
* Query capabilities
* Consistency
* Transactions
* TTL support
* Indexing
* Performance characteristics
* Database-native operations

Changing providers may therefore require configuration changes, data migration, and application adjustments. JNoSQL lets applications use standardized abstractions where appropriate while retaining access to provider-specific features through specialized templates and extensions.

The [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) repository is the reference for the supported database integrations, their dependencies, and configuration.

## Jakarta EE Specifications

* **[Jakarta Data](https://github.com/jakartaee/data)** — standardized repository-oriented persistence.
* **[Jakarta NoSQL](https://github.com/jakartaee/nosql)** — standardized NoSQL mapping and persistence APIs.
* **[Jakarta Query](https://github.com/jakartaee/query)** — a common query foundation for Jakarta persistence technologies. Its integration with Eclipse JNoSQL is under development.

The specifications are complementary, not interchangeable: Jakarta NoSQL defines mapping and templates for NoSQL, Jakarta Data defines repositories, and Jakarta Query is intended to provide the query concepts they can share.

## Community and Further Reading

Eclipse JNoSQL™ is an [Eclipse Foundation](https://www.eclipse.org/) project. For governance, releases, and contributors, visit the [Eclipse JNoSQL project page](https://projects.eclipse.org/projects/technology.jnosql).

- [Eclipse JNoSQL source](https://github.com/eclipse-jnosql/jnosql)
- [Database integrations](https://github.com/eclipse-jnosql/jnosql-databases)
- [Example applications](https://github.com/JNOSQL/demos-se) ([Jakarta EE demos](https://github.com/JNOSQL/demos-ee))
- [Contributing guide](https://github.com/eclipse-jnosql/jnosql/blob/main/CONTRIBUTING.adoc)
- [Mailing list](https://accounts.eclipse.org/mailing-list/jnosql-dev)
- [Website](https://www.jnosql.org/)
