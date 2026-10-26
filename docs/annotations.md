---
sort: 10
---

# Mapping Annotations Reference

Jakarta NoSQL defines annotations that map Java classes and attributes to NoSQL persistence structures. Eclipse JNoSQL implements these mapping concepts across its database integrations, so the same entity model can be reused across the supported database models, subject to what each model and provider can express.

The annotations cover:

* Entity identification.
* Persistent attributes.
* Entity inheritance.
* Embedded values.
* Attribute conversion.
* Query projections.

Not every annotation you will meet belongs to Jakarta NoSQL. CDI qualifiers, Jakarta Data repository annotations, and Eclipse JNoSQL extensions serve different purposes and are defined by different APIs (see [Annotation Ownership and Portability](#9-annotation-ownership-and-portability)).

This page is a quick reference. The individual guides explain persistence operations for each model: [Key-Value](/docs/key-value.html), [Wide-Column](/docs/column.html), [Document](/docs/document.html), [Graph](/docs/graph.html), [Time Series](/docs/time-series.html) and [Vector](/docs/vector.html).

## 1. Quick Annotation Reference

All annotations below are in the `jakarta.nosql` package.

| Annotation | Target | Purpose |
|---|---|---|
| `@Entity` | Class | Declares a persistent entity; optional `value` (structure name) and `name` (name used in queries) |
| `@Id` | Field, constructor parameter | Identifies the entity identifier; optional `value` (identifier name, default `_id`) |
| `@Column` | Field, constructor parameter | Maps an attribute; optional `value` (name) and `udt` |
| `@MappedSuperclass` | Class | Shares persistent mapping with entities that extend it |
| `@Embeddable` | Class | Declares a value type stored as part of an owning entity; `FLAT` (default) or `GROUPING` |
| `@Inheritance` | Class | Configures entity inheritance, placed on the root of the hierarchy |
| `@DiscriminatorColumn` | Class | Names the discriminator attribute (default `dtype`) |
| `@DiscriminatorValue` | Class | Sets the discriminator value of a concrete entity (default: simple class name) |
| `@Convert` | Field, constructor parameter | Applies an `AttributeConverter` to an attribute |
| `@Converter` | Class | Declares an attribute converter; optional `autoApply` (default `false`) |
| `@Projection` | Record | Maps query results into a record; optional `from` |

## 2. Basic Entity Mapping

`@Entity`, `@Id` and `@Column` are the core of the mapping.

```java
import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;

@Entity
public class Product {

    @Id
    private String id;

    @Column
    private String name;

    @Column("unit_price")
    private BigDecimal price;

    @Column
    private List<String> tags;

    // constructors, getters and setters
}
```

* `@Entity` names the database structure after the simple class name by default, and `@Entity("products")` overrides it. What the structure is depends on the model: a collection, a bucket, a column family, or a vertex or edge label. The `name` attribute defines the name used in `FROM` clauses of queries when it should differ from the class name.
* `@Id` is required: according to the Jakarta NoSQL API, an entity must have an identifier, and `@Column` alone does not establish identity. Identifier types are primitives and their wrappers, `String`, `UUID`, `BigDecimal` and `BigInteger`, or a type adapted with `@Convert`. Whether a null identifier is rejected or generated depends on the database and provider.
* `@Column` marks an attribute as persistent. Attributes without it are not persisted.

The entity can be instantiated through a no-argument constructor that is public, protected or package-private, or through a single constructor whose parameters are annotated with `@Id` and `@Column`. If both exist, the annotated constructor is preferred. Records can be entities as well:

```java
@Entity
public record Product(@Id String id, @Column String name, @Column BigDecimal price) {
}
```

Jakarta NoSQL mapping is not the same as Jakarta Persistence mapping; do not assume that JPA behavior applies to these annotations.

## 3. Embedded Objects

`@Embeddable` declares a value type stored as part of its owning entity. It has no identity of its own, so `@Id` is not required, but it needs at least one `@Column` attribute.

```java
import jakarta.nosql.Column;
import jakarta.nosql.Embeddable;

@Embeddable
public class ProductDetails {

    @Column
    private String manufacturer;

    @Column
    private String warranty;
}

@Entity
public class Product {

    @Id
    private String id;

    @Column
    private ProductDetails details;
}
```

The `value` attribute selects the strategy:

* `FLAT` (the default) stores the embedded attributes together with the owning entity's attributes. Every implementation is required to support it.
* `GROUPING` stores the embedded value as a structured type under the attribute name. Support and behavior vary by database, and a provider may require extra configuration such as `@Column(udt = "...")`; an unsupported strategy can raise `UnsupportedOperationException` or `MappingException`.

```java
@Embeddable(Embeddable.EmbeddableType.GROUPING)
public class ProductDetails { /* ... */ }
```

The physical representation depends on the selected model and provider. An embedded Java object does not automatically become a native Cassandra or ScyllaDB user-defined type; see the [Wide-Column guide](/docs/column.html) for provider-specific UDT mapping, and the [Document guide](/docs/document.html) for sub-documents.

## 4. Inheritance Mapping

Two different mechanisms exist, and they should not be confused.

* **Inheriting mapped attributes.** `@MappedSuperclass` shares attributes with subclasses. The superclass is not persistent and has no database structure of its own; its mappings are applied to each entity that extends it.
* **Persisting an entity hierarchy.** `@Inheritance` stores the entities of a hierarchy together, using a discriminator to tell them apart.

### Mapped Superclass

```java
@MappedSuperclass
public abstract class CatalogItem {

    @Id
    protected String id;

    @Column
    protected String name;
}

@Entity
public class Product extends CatalogItem {

    @Column
    protected BigDecimal price;
}
```

### Entity Hierarchy

`@Inheritance` goes on the root of the hierarchy. The root may be abstract. According to the API, the database structure holds the attributes of every class in the hierarchy, and subclasses use the entity name of the class annotated with `@Inheritance`.

`@DiscriminatorColumn` names the discriminator attribute (default `dtype`), and `@DiscriminatorValue` sets the value for a concrete entity (default: the simple class name).

```java
@Entity
@Inheritance
@DiscriminatorColumn("type")
public abstract class Notification {

    @Id
    private String id;

    @Column
    private String recipient;
}

@Entity
@DiscriminatorValue("SMS")
public class SmsNotification extends Notification {

    @Column
    private String phoneNumber;
}

@Entity
@DiscriminatorValue("EMAIL")
public class EmailNotification extends Notification {

    @Column
    private String email;
}
```

Inheritance support and the way hierarchies are stored differ between databases, so check your provider's documentation before relying on polymorphic queries.

## 5. Attribute Conversion

`@Convert` applies a converter to an attribute. The converter implements `AttributeConverter<X, Y>`, where `X` is the entity attribute type and `Y` is a type the database can persist, and is declared with `@Converter`.

```java
import jakarta.nosql.AttributeConverter;
import jakarta.nosql.Converter;

public record Money(Currency currency, BigDecimal amount) {

    public static Money parse(String value) {
        String[] parts = value.split(" ");
        return new Money(Currency.getInstance(parts[0]), new BigDecimal(parts[1]));
    }

    @Override
    public String toString() {
        return currency.getCurrencyCode() + " " + amount;
    }
}

@Converter
public class MoneyConverter implements AttributeConverter<Money, String> {

    @Override
    public String convertToDatabaseColumn(Money attribute) {
        return attribute == null ? null : attribute.toString();
    }

    @Override
    public Money convertToEntityAttribute(String dbData) {
        return dbData == null ? null : Money.parse(dbData);
    }
}

@Entity
public class Product {

    @Id
    private String id;

    @Column
    @Convert(MoneyConverter.class)
    private Money price;
}
```

With `@Converter(autoApply = true)`, the converter is applied automatically to every mapped attribute of the converted type, unless conversion is explicitly overridden. With the default `autoApply = false`, the converter applies only where `@Convert` selects it. Converters should be stateless, and it is the converter's responsibility to produce a type the database supports.

## 6. Query Projections

`@Projection` declares a Java record that receives query results. It lets a query return only the attributes you need instead of whole entities. The mapping is read-only and does not affect inserts or updates.

```java
import jakarta.nosql.Projection;

@Projection(from = Product.class)
public record ProductSummary(String name, BigDecimal price) {
}
```

Use it with `Template.typedQuery`:

```java
List<ProductSummary> summaries = template
        .typedQuery("WHERE price < :max", ProductSummary.class)
        .bind("max", new BigDecimal("100"))
        .result();
```

How the pieces relate:

* Record components are matched to query result attributes by name. Use `@Column("path")` on a component to map a different or nested attribute, for example `@Column("user.name") String customerName`.
* `from` names the source entity, which must be annotated with `@Entity`. It lets the query omit the `FROM` clause. If the query declares a `FROM` clause, the query takes precedence, and the entity must be compatible with the target type; otherwise the provider may throw `IllegalArgumentException`.
* Without `from`, write the `FROM` clause: `template.typedQuery("FROM Product WHERE price < 100", ProductSummary.class)`.
* `typedQuery` also accepts an `@Entity` class as the result type.

Limitations: the target must be a record, and `typedQuery` depends on provider support. For example, key-value databases in Eclipse JNoSQL currently throw `UnsupportedOperationException` for `typedQuery`.

## 7. Selecting Database Providers with CDI

Applications with several database integrations or persistence contexts need to tell CDI which template to inject. Eclipse JNoSQL provides the `@Database` qualifier for this. It is a CDI qualifier, not a Jakarta NoSQL mapping annotation.

```java
import org.eclipse.jnosql.mapping.Database;
import org.eclipse.jnosql.mapping.DatabaseType;

@Inject
@Database(DatabaseType.DOCUMENT)
private DocumentTemplate catalog;

@Inject
@Database(value = DatabaseType.DOCUMENT, provider = "reporting")
private DocumentTemplate reporting;
```

* `DatabaseType` has the values `DOCUMENT`, `COLUMN`, `KEY_VALUE`, `GRAPH`, `TIME_SERIES`, `VECTOR` and `SHARED`, covering the six database models.
* `provider` is optional and selects a named provider; without it, the default provider for that type is used.
* `@Database` can be applied to fields, methods, parameters and types.
* The `provider` value must match the provider used when the matching manager or database configuration is registered. Applications that create managers programmatically can expose them through CDI producers annotated with the same `@Database` qualifier. See the model guides and the [Supported Databases](/docs/supported_dbs.html) page for provider configuration.

## 8. Jakarta Data Repository Annotations

Jakarta Data defines `@Repository`. It is part of Jakarta Data, not Jakarta NoSQL entity mapping.

```java
import jakarta.data.repository.BasicRepository;
import jakarta.data.repository.Repository;

@Repository
public interface ProductRepository extends BasicRepository<Product, String> {
}
```

The entity is still mapped with the Jakarta NoSQL annotations above. For repository examples, see the [Introduction](/docs/introduction.html) and the model guides.

## 9. Annotation Ownership and Portability

| Category | Examples | Defined by |
|---|---|---|
| Jakarta NoSQL mapping | `@Entity`, `@Id`, `@Column`, `@MappedSuperclass`, `@Embeddable`, `@Inheritance`, `@DiscriminatorColumn`, `@DiscriminatorValue`, `@Convert`, `@Converter`, `@Projection` | [Jakarta NoSQL](https://github.com/jakartaee/nosql) |
| Repository | `@Repository`, and Jakarta Data query and lifecycle annotations | [Jakarta Data](https://github.com/jakartaee/data) |
| CDI qualifier | `@Database`, `DatabaseType` | Eclipse JNoSQL (`org.eclipse.jnosql.mapping`) |
| JNoSQL-specific extensions | Graph (`GraphTemplate`, `Edge`), Time Series and Vector APIs, provider-specific templates | [Eclipse JNoSQL](https://github.com/eclipse-jnosql/jnosql) and [database integrations](https://github.com/eclipse-jnosql/jnosql-databases) |

Standardized annotations give a consistent programming model, but the persistence behavior depends on the database model and provider. The same annotation does not have identical semantics across all six models, and some features, such as `GROUPING` embeddables, inheritance and `typedQuery`, are available only where a provider supports them.

## 10. Further Reading

* [Jakarta NoSQL specification and Javadoc](https://github.com/jakartaee/nosql)
* [Jakarta Data specification](https://github.com/jakartaee/data)
* [Eclipse JNoSQL source repository](https://github.com/eclipse-jnosql/jnosql)
* Model guides: [Key-Value](/docs/key-value.html), [Wide-Column](/docs/column.html), [Document](/docs/document.html), [Graph](/docs/graph.html), [Time Series](/docs/time-series.html), [Vector](/docs/vector.html)

This page is a mapping reference; the guides explain the persistence operations for each database model.
