---
layout: default
title: Wide-Column Databases
sort: 5
nav_title: Wide-Column
nav_group: models
nav_icon: columns
---

## 1. Introduction to Wide-Column NoSQL Databases

A Wide-Column database, also called a column-family database, organizes information into rows and columns, often grouped into column families or tables. The structure resembles a relational table, but the storage model, data distribution, schema design, and query capabilities can differ substantially.

### Why Choose a Wide-Column Database?

Depending on the provider and its configuration, Wide-Column databases offer:

* Distributed storage across multiple nodes and horizontal scalability.
* Efficient handling of large datasets.
* High write throughput for suitable workloads.
* Partition-oriented data access.
* Availability and fault tolerance.
* Flexible modeling of large-scale application data.

Typical use cases include:

* Financial transaction histories
* Customer activity tracking
* Event ingestion
* Large distributed applications
* Telemetry and operational data
* High-volume event records

### Trade-offs

* Schema design is often driven by query patterns.
* The partition key significantly affects performance, and a poor design can create hotspots or oversized partitions.
* Secondary indexing may be limited or provider-specific.
* Joins and arbitrary relational-style queries may not be supported.
* Data duplication can be an intentional modeling strategy.
* Consistency, transactions, and batch semantics vary by database.

A Wide-Column database is not inherently faster or more scalable than other models. Suitability depends on the workload and the physical data model.

## 2. Partitioning and Query-Oriented Data Modeling

This is the key architectural difference between Wide-Column databases and other NoSQL models.

* **Partition key:** determines how data is grouped and distributed, depending on the database. A well-chosen key spreads the workload and supports efficient access patterns.
* **Clustering columns:** where supported, determine the ordering of records within a partition.
* **Query-driven modeling:** tables are usually designed around the queries the application must run.

For example, a banking application may need the transactions of an account within a time range. A schema could use the account identifier as the partition key and the time as a clustering column. The following is an illustrative **Apache Cassandra** (CQL) definition, not a universal Wide-Column schema:

```sql
CREATE TABLE account_transactions (
    account_id text,
    transaction_id uuid,
    occurred_at timestamp,
    amount decimal,
    PRIMARY KEY (
        (account_id),
        occurred_at,
        transaction_id
    )
) WITH CLUSTERING ORDER BY (
    occurred_at DESC,
    transaction_id ASC
);
```

`@Id` in Jakarta NoSQL does not automatically configure the complete physical partition and clustering strategy. Partitioning and indexing usually require provider-specific schema configuration, which is a concern of the underlying database.

## 3. Minimum Requirements

Before you start, make sure your application meets the common [Minimum Requirements](/docs/minimum.html) of Eclipse JNoSQL™. They apply to the Wide-Column mapping integration. The database provider you choose may add client dependencies, configuration, and runtime requirements.

## 4. Choosing a Wide-Column NoSQL Database

Eclipse JNoSQL supports Wide-Column databases through integration modules. Evaluate:

* Partitioning strategy and data distribution
* Read and write throughput
* Consistency guarantees
* Replication and availability
* Transaction support
* Query capabilities
* TTL behavior
* Operational complexity
* Managed-cloud or self-hosted deployment

JNoSQL provides common programming abstractions without removing the differences between the underlying databases.

### Supported Databases

The [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) repository contains the dependencies, configuration options, and provider-specific capabilities of each integration. See also the [Supported Databases](/docs/supported_dbs.html) page.

## 5. Adding the Eclipse JNoSQL™ Dependency

This guide uses Apache Cassandra as the example:

```xml
<dependency>
    <groupId>org.eclipse.jnosql.databases</groupId>
    <artifactId>jnosql-cassandra</artifactId>
    <version>{{ site.jnosql_databases_version }}</version>
</dependency>
```

Other Wide-Column integrations require their own dependency. Changing the dependency alone does not guarantee identical query behavior or physical data modeling.

## 6. Configuring the Database

Eclipse JNoSQL uses [MicroProfile Config](https://microprofile.io/specifications/microprofile-config/), so properties can come from `META-INF/microprofile-config.properties`, environment variables, or system properties.

### Common JNoSQL Configuration

```properties
jnosql.column.database=banking
```

`jnosql.column.database` selects the database (for Cassandra, the keyspace). When more than one Wide-Column integration is on the classpath, also set `jnosql.column.provider` to the provider's configuration class.

### Provider-Specific Configuration

The Cassandra integration reads these properties:

| Property | Description |
|----------|-------------|
| `jnosql.cassandra.host` | Contact points; a prefix, e.g. `jnosql.cassandra.host.1=localhost` |
| `jnosql.cassandra.port` | Port |
| `jnosql.cassandra.user` / `jnosql.cassandra.password` | Credentials |
| `jnosql.cassandra.data.center` | Local datacenter used by load balancing |
| `jnosql.cassandra.name` | Application name of the session |
| `jnosql.cassandra.query` | CQL executed at startup; a prefix, e.g. `jnosql.cassandra.query.1` |

Do not hardcode credentials; use environment variables or your secrets management.

### Schema Initialization

The `jnosql.cassandra.query.N` properties are still supported. Each one is executed when the configuration starts, which is convenient for development:

```properties
jnosql.column.database=banking
jnosql.cassandra.host.1=localhost
jnosql.cassandra.query.1=CREATE KEYSPACE IF NOT EXISTS banking WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
jnosql.cassandra.query.2=CREATE TYPE IF NOT EXISTS banking.payment_address (street text, city text, country text);
jnosql.cassandra.query.3=CREATE TABLE IF NOT EXISTS banking.bank_transaction (id text PRIMARY KEY, account_id text, amount decimal, occurred_at timestamp, address frozen<payment_address>);
jnosql.cassandra.query.4=CREATE INDEX IF NOT EXISTS ON banking.bank_transaction (account_id);
```

`SimpleStrategy` with one replica is only suitable for local development. In production, manage schemas and replication with the database's own tooling. See the [Cassandra integration documentation](https://github.com/eclipse-jnosql/jnosql-databases#cassandra) for all options.

## 7. Mapping Java Entities to Wide-Column Data

The following entity matches the `bank_transaction` table above; the `address` field is explained in the next subsection. Cassandra folds unquoted identifiers to lowercase, so the mapping uses explicit lowercase names:

```java
import jakarta.nosql.Column;
import jakarta.nosql.Entity;
import jakarta.nosql.Id;

import java.math.BigDecimal;
import java.time.Instant;

@Entity("bank_transaction")
public class BankTransaction {

    @Id
    private String id;

    @Column("account_id")
    private String accountId;

    @Column
    private BigDecimal amount;

    @Column("occurred_at")
    private Instant occurredAt;

    @Column(udt = "payment_address")
    private PaymentAddress address;

    BankTransaction() {
    }

    public BankTransaction(String id, String accountId, BigDecimal amount,
                           Instant occurredAt, PaymentAddress address) {
        this.id = id;
        this.accountId = accountId;
        this.amount = amount;
        this.occurredAt = occurredAt;
        this.address = address;
    }

    public String getId() { return id; }

    public String getAccountId() { return accountId; }

    public BigDecimal getAmount() { return amount; }

    public Instant getOccurredAt() { return occurredAt; }

    public PaymentAddress getAddress() { return address; }
}
```

* `@Entity` marks the class and names the table.
* `@Id` marks the identifier.
* `@Column` maps a field to a column; the optional value sets the column name.
* Entities need a non-private constructor without parameters.

### Important Architectural Distinction

Mapping an identifier does not define the database's partition key, clustering key, or indexes. The physical schema must be compatible with the mapping. Here `id` is the whole primary key, so the table differs from the illustrative schema in Section 2, and queries by `account_id` rely on a secondary index.

### Mapping Structured Data with User-Defined Types

Cassandra and ScyllaDB support User-Defined Types (UDTs): named, reusable structures that group related attributes into a single column value. UDTs are useful to:

* Represent structured values within a table.
* Avoid spreading related attributes across unrelated columns.
* Make the data model clearer and reuse one type definition in several tables.
* Model nested domain information and composite values without additional tables.

A UDT does not provide joins and does not establish relationships between entities. UDTs are a provider-specific database capability, not a requirement of Jakarta NoSQL.

The Cassandra and ScyllaDB integrations map a nested Java class through the `udt` attribute of `@Column`, which names the database type. The nested class is an ordinary class whose fields are annotated with `@Column`; it needs no `@Entity` or other class-level annotation, but should have a non-private no-argument constructor like entities do:

```java
import jakarta.nosql.Column;

public class PaymentAddress {

    @Column
    private String street;

    @Column
    private String city;

    @Column
    private String country;

    PaymentAddress() {
    }

    public PaymentAddress(String street, String city, String country) {
        this.street = street;
        this.city = city;
        this.country = country;
    }

    public String getStreet() { return street; }

    public String getCity() { return city; }

    public String getCountry() { return country; }
}
```

The type must exist in the keyspace before a table can reference it, and the column and field names must match. This CQL is provider-specific, not portable Jakarta NoSQL schema syntax (the startup queries in Section 6 create it):

```sql
CREATE TYPE payment_address (
    street text,
    city text,
    country text
);

CREATE TABLE bank_transaction (
    id text PRIMARY KEY,
    account_id text,
    amount decimal,
    occurred_at timestamp,
    address frozen<payment_address>
);
```

The `ColumnTemplate` code in Section 8 persists and reads this structure: `template.insert(transaction)` writes `address` as a `payment_address` value, and `template.find(BankTransaction.class, "tx-1")` returns an entity whose `getAddress()` is a populated `PaymentAddress`. A `List<PaymentAddress>` field mapped with the same `udt` attribute is also supported by the integration, and the database column would be a collection of frozen UDTs.

**Frozen and non-frozen.** A `frozen` UDT is serialized and stored as a single value: it is read and written as a whole, and individual nested attributes cannot be updated in place. JNoSQL writes the complete `PaymentAddress` on every save, which fits this model. Non-frozen UDTs, where available in your database version, allow updating individual attributes, but support and restrictions depend on the database version and driver; check your provider's documentation. This guide has not been validated against a running Cassandra or ScyllaDB instance.

**UDTs compared with other approaches:**

* *Scalar columns:* simpler, but related values are scattered and cannot be reused as a type.
* *Collections (list, set, map):* suit homogeneous values; a UDT suits a few named fields of different types.
* *Separate tables:* needed when the data is queried or changed independently or shared between entities; Wide-Column databases have no joins, so this means a second query or duplication.
* *Application-side composition:* keeps the database simple but forces you to encode and decode the value yourself.

Use a UDT when several fields form a cohesive value object; it is not automatically the best choice for every nested structure.

**Portability.** UDT behavior is not guaranteed to be identical across Wide-Column providers. A migration can require changes to physical schemas and UDT definitions, driver codecs, serialization, data migration, and query and update behavior. See the [Cassandra](https://github.com/eclipse-jnosql/jnosql-databases#cassandra) and [ScyllaDB](https://github.com/eclipse-jnosql/jnosql-databases#scylladb) integration documentation. ScyllaDB uses the `jnosql-scylladb` dependency and the `jnosql.scylladb.*` properties, and supports the same `@Column(udt = ...)` mapping.

## 8. ColumnTemplate and the Template API

Jakarta NoSQL defines `jakarta.nosql.Template` as the common persistence abstraction. `ColumnTemplate` (`org.eclipse.jnosql.mapping.column.ColumnTemplate`) specializes it for Wide-Column persistence.

| Interface | Role |
|-----------|------|
| `Template` | Common operations: insert, update, find, delete, and supported queries. |
| `ColumnTemplate` | The Wide-Column entry point to inject, with the same familiar operations for column-oriented data. |

Providers can offer further specializations. For example, the Cassandra integration provides `CassandraTemplate`, which adds CQL execution and consistency levels (see Section 10).

```java
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.jnosql.mapping.column.ColumnTemplate;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Optional;

@ApplicationScoped
public class TransactionService {

    @Inject
    ColumnTemplate template;

    public void crud() {
        BankTransaction transaction = new BankTransaction("tx-1", "account-123",
                new BigDecimal("150.00"), Instant.now(),
                new PaymentAddress("Main Street 1", "Lisbon", "Portugal"));

        template.insert(transaction);

        Optional<BankTransaction> found = template.find(BankTransaction.class, "tx-1");

        BankTransaction updated = new BankTransaction("tx-1", "account-123",
                new BigDecimal("175.00"), transaction.getOccurredAt(), transaction.getAddress());
        template.update(updated);

        template.delete(BankTransaction.class, "tx-1");
    }
}
```

`ColumnTemplate` converts entities to and from the database representation, so you do not map each field to a driver type manually. Mutation semantics depend on the provider: Cassandra writes are upserts, so do not assume relational-style behavior where inserting an existing key fails or updating a missing row fails.

## 9. Fluent API: Expressive Queries with Java

Wide-Column databases typically have their own query language and driver API; Cassandra, for instance, uses CQL with specific query constraints and modeling conventions. Without an abstraction, application code depends heavily on driver-specific query builders and result conversion.

The Fluent API from Jakarta NoSQL expresses supported operations as Java method chains. It offers:

* Readable query construction and less boilerplate.
* Consistent patterns across database models.
* Composition of supported predicates.
* Integration with entity mapping: you use Java attribute names.
* Less coupling to driver-specific query objects.

### Fluent Select Example

```java
List<BankTransaction> transactions = template.select(BankTransaction.class)
        .where("accountId").eq("account-123")
        .result();
```

`where("accountId")` is translated to the mapped column `account_id`. This works in our example only because the schema in Section 6 has an index on that column. JNoSQL does not create partition keys or indexes for queried properties.

### Conditions and Ordering

With the Section 2 design (partition key `account_id`, clustering column `occurred_at`), a time-range query with ordering is natural:

```java
List<BankTransaction> transactions = template.select(BankTransaction.class)
        .where("accountId").eq("account-123")
        .and("occurredAt").gte(Instant.parse("2025-01-01T00:00:00Z"))
        .orderBy("occurredAt").desc()
        .limit(50)
        .result();
```

This requires a table whose primary key is built that way and an entity mapped to it, which would not support `find` by `id` alone. Filtering and ordering are constrained by the physical data model: Cassandra, for example, restricts range predicates and sorting to clustering columns. The `id`-keyed table from Section 6 cannot run this query efficiently.

### Fluent Delete

```java
template.delete(BankTransaction.class)
        .where("id").eq("tx-1")
        .execute();
```

Predicate-based deletion depends on the integration and the schema; in Cassandra, a delete normally must identify the full primary key.

### Critical Explanation

**The Fluent API simplifies query construction, but it does not eliminate database-specific query restrictions.** A database may require partition-key information in queries or limit range predicates and sorting. JNoSQL does not turn every Java predicate into an efficient database operation.

### When to Use the Fluent API

Use it when you need explicit or dynamically constructed queries beyond straightforward repository operations.

## 10. Database-Native Queries and Advanced Operations

Some applications need functionality that common Jakarta NoSQL abstractions do not cover, such as provider-specific consistency options, batch operations, conditional mutations, specialized indexing, or native functions. JNoSQL accommodates provider-specific extensions.

In the Cassandra integration, `CassandraTemplate` extends `ColumnTemplate` and can run CQL and use consistency levels:

```java
import com.datastax.oss.driver.api.core.ConsistencyLevel;
import org.eclipse.jnosql.databases.cassandra.mapping.CassandraTemplate;

@Inject
CassandraTemplate template;

Stream<BankTransaction> transactions = template.cql(
        "SELECT * FROM banking.bank_transaction WHERE account_id = :accountId",
        Map.of("accountId", "account-123"));

template.save(transaction, ConsistencyLevel.QUORUM);
```

CQL is a native query language for Cassandra; it is not portable across providers, and it is distinct from the Jakarta Common Query Language (JCQL). See the [Cassandra integration documentation](https://github.com/eclipse-jnosql/jnosql-databases#cassandra) for the full list of operations.

## 11. Consistency, Replication, and TTL

**Consistency.** Distributed Wide-Column databases can offer configurable consistency guarantees, but they do not share a single model. In Cassandra, `CassandraTemplate` accepts a `ConsistencyLevel` per operation, as shown above.

**Replication.** Replication and partition distribution influence availability and latency. They are configured in the database, not in the Java mapping.

**Time-to-Live.** Some Wide-Column databases support record or column expiration. The `Template` API accepts a `Duration`:

```java
template.insert(transaction, Duration.ofDays(30));
```

TTL behavior depends on the integration and the database. A provider that does not support it, or does not support the requested duration or granularity, may throw `UnsupportedOperationException`. Do not assume TTL is available for every provider; check yours.

## 12. Serialization and Database-Specific Behavior

JNoSQL maps Java entities to the data structures of the model, while each integration handles communication and value conversion. Differences between providers can include:

* Native column data types.
* Java-to-database value conversion.
* Collection representation.
* Identifier mapping.
* Null handling.
* TTL support.
* Query operators.
* Schema definitions.
* Consistency and transaction semantics.

Verify these details in your provider's documentation.

### Portability

Replacing one Wide-Column database with another can require changes to:

* Dependencies.
* Configuration.
* Physical schemas.
* Data serialization.
* Query patterns.
* Consistency settings.
* Data migration.

JNoSQL aims to reduce unnecessary coupling while allowing access to database-specific behavior. It does not promise complete interchangeability.

## 13. Jakarta Data Repositories

Jakarta Data provides a declarative, repository-oriented programming model. Using the same `BankTransaction` entity:

```java
import jakarta.data.repository.BasicRepository;
import jakarta.data.repository.Repository;

@Repository
public interface BankTransactionRepository
        extends BasicRepository<BankTransaction, String> {
}
```

```java
@Inject
BankTransactionRepository repository;

public void usage() {
    repository.save(new BankTransaction("tx-1", "account-123",
            new BigDecimal("150.00"), Instant.now(),
            new PaymentAddress("Main Street 1", "Lisbon", "Portugal")));

    Optional<BankTransaction> transaction = repository.findById("tx-1");

    repository.deleteById("tx-1");
}
```

Derived queries such as `findByAccountId` are only appropriate when the selected integration and physical schema support that query efficiently; in our example it would rely on the secondary index.

### Repository Versus ColumnTemplate

* **Jakarta Data repository:** declarative persistence and application-level repository abstractions.
* **`ColumnTemplate`:** explicit persistence operations, fluent queries, and more direct control over supported Wide-Column behavior.

They are complementary, and neither removes the database's partitioning or query restrictions.

## 14. Jakarta EE Data Specifications

* **Jakarta NoSQL:** mapping and specialized NoSQL persistence APIs, including the templates and Fluent API used here.
* **Jakarta Data:** repository-oriented persistence.
* **[Jakarta Query](https://github.com/jakartaee/query):** a common query foundation for Jakarta persistence technologies. Its integration into Eclipse JNoSQL is under development and should not be assumed to be available.

See the [Introduction](/docs/introduction.html) for the overall architecture.

## 15. Explore Wide-Column Database Integrations

This guide introduces the common programming model and architectural considerations of Wide-Column persistence. For database-specific configuration, partitioning, schema design, and advanced capabilities, see the [jnosql-databases](https://github.com/eclipse-jnosql/jnosql-databases) repository.

* [Supported Databases](/docs/supported_dbs.html)
* [Cassandra integration documentation](https://github.com/eclipse-jnosql/jnosql-databases#cassandra)
* [Jakarta NoSQL](https://github.com/jakartaee/nosql)
* [Jakarta Data](https://github.com/jakartaee/data)
* JNoSQL examples: [demos-se](https://github.com/JNOSQL/demos-se) and [demos-ee](https://github.com/JNOSQL/demos-ee)
