---
sort: 4
---

## 1. Introduction to Key-Value NoSQL Databases

A Key-Value database associates a unique key with a value. Applications typically store, retrieve, and remove values through their keys rather than relying on rich queries over relationships or arbitrary fields. This simplicity makes data access straightforward, lookups by identifier efficient, and independent records easy to model. Depending on the database and workload, it can also offer high throughput, low latency, and a good fit for distributed applications.

The model has trade-offs. Querying arbitrary attributes may be unavailable or provider-specific, and complex relationships generally require application-level modeling or a different database model. Transaction guarantees and expiration behavior depend on the selected database, and performance and scalability depend on the actual provider, its configuration, and the workload. A Key-Value database is not automatically faster or more scalable than other models.

Typical use cases include:

* Caching
* User sessions
* Shopping carts
* Application state
* Feature flags
* Fast identifier-based lookups

## 2. Minimum Requirements

Before you start, make sure your application meets the common [Minimum Requirements](/docs/minimum.html) of Eclipse JNoSQL™. The Key-Value API has no additional platform requirements, although the database integration you choose may declare its own.

## 3. Choosing a Key-Value NoSQL Database

Eclipse JNoSQL supports multiple Key-Value databases through provider integrations, so you can choose the one that best matches your application requirements, such as:

* Latency and throughput
* Persistence and durability
* Clustering and availability
* Memory consumption
* Expiration and TTL support
* Serialization and storage format
* Operational complexity
* Deployment environment

Providers that implement the same JNoSQL abstractions let you preserve much of your Java persistence model, including entities, templates, and repositories. This does not make databases completely interchangeable: providers differ in operational characteristics and supported capabilities.

### Supported Databases

[Explore the supported Key-Value databases](https://github.com/eclipse-jnosql/jnosql-databases) to find available integrations, dependencies, configuration options, and provider-specific capabilities. The same information is summarized on the [Supported Databases](/docs/supported_dbs.html) page.

## 4. Adding the Eclipse JNoSQL™ Dependency

To use a specific Key-Value database, add the corresponding integration to your project. For example, to use Redis, add the following Maven dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>org.eclipse.jnosql.databases</groupId>
  <artifactId>jnosql-redis</artifactId>
  <version>{{ site.jnosql_databases_version }}</version>
</dependency>
```

## 5. Configuring Database Credentials

After adding the dependency, configure the connection settings of your database, such as the database name, host, port, and any required authentication. Settings are read through [MicroProfile Config](https://microprofile.io/microprofile-config/), so they can be overridden by the environment.

The available properties are provider-specific; consult the [jnosql-databases repository](https://github.com/eclipse-jnosql/jnosql-databases) for the database you chose. For example, for Redis:

```properties
jnosql.keyvalue.database=developers
jnosql.redis.port=6379
jnosql.redis.host=localhost
```

When more than one Key-Value driver is on the classpath, also set `jnosql.keyvalue.provider` to select the provider class.

## 6. Serialization and Provider Differences

Storing a Java object in a Key-Value database requires representing it in a format that the underlying database and its integration can handle. The responsibility is shared between two layers.

**Java Mapping**

JNoSQL maps the Java entity and its identifier according to the Jakarta NoSQL mapping rules. The `@Id` attribute becomes the key, and the entity is handed to the database integration as the value.

**Provider Serialization**

The database integration represents the value in the form required to communicate with and persist data in the selected database. Depending on the provider, this can involve JSON-B, the native client's serialization, or other provider-specific mechanisms.

The current integrations are not uniform. For instance, the Redis and Riak integrations store values as JSON produced with JSON-B, while others, such as Infinispan and Hazelcast, pass the value to their native client, which applies its own serialization rules. Do not assume that every provider supports every format; check the documentation and configuration of your integration.

### Portability Considerations

Switching providers can require changes to:

* Connection configuration
* Provider dependencies
* Serialization settings
* Stored data representations
* Provider-specific capabilities

Even when the Java code stays the same, existing stored data may need migration or transformation. The main benefit is reducing unnecessary coupling, not guaranteeing identical physical storage or behavior.

## 7. Set up a class with annotations

```java
@Entity
public class UserSession {

  @Id
  private String sessionId;

  @Column
  private String userName;

  @Column
  private Instant createdAt;

  // constructors, getters, and setters
}
```

The `@Entity` annotation marks the class as an entity, and `@Id` indicates the attribute used as the key.

## 8. Working with KeyValueTemplate

Jakarta NoSQL provides a general persistence abstraction, `jakarta.nosql.Template`. Eclipse JNoSQL provides `KeyValueTemplate`, which extends `Template` for Key-Value storage.

**Template**

Provides the persistence operations shared across NoSQL models, such as `insert`, `update`, `delete`, `find`, and queries.

**KeyValueTemplate**

Extends `Template` with operations suited to Key-Value storage:

* `put` — stores an entity, optionally with a time to live (`Duration`).
* `get` — retrieves one or more entities by key.
* `deleteByKey` / `deleteByKeys` — removes entities by identifier.

Inject it with CDI:

```java
@Inject
KeyValueTemplate template;
```

```java
UserSession session = new UserSession("s-1", "alice", Instant.now());

// Store an entity
template.put(session);

// Store an entity that expires, when the provider supports TTL
template.put(session, Duration.ofMinutes(30));

// Retrieve an entity by key
Optional<UserSession> found = template.get("s-1", UserSession.class);

// Delete an entity by key
template.deleteByKey("s-1");
```

Because `KeyValueTemplate` is a `Template`, the common operations (for example `find(UserSession.class, "s-1")`) remain available.

## 9. Using Jakarta Data repositories

For common operations you can also declare a [Jakarta Data](https://github.com/jakartaee/data) repository and let Eclipse JNoSQL provide the implementation:

```java
@Repository
public interface UserSessionRepository extends BasicRepository<UserSession, String> {}
```

```java
@Inject
UserSessionRepository repository;

// Save an entity
repository.save(new UserSession("s-1", "alice", Instant.now()));

// Retrieve an entity by key
Optional<UserSession> found = repository.findById("s-1");

// Delete an entity by key
repository.deleteById("s-1");
```

Note: Keep in mind that Key-Value databases have limitations on querying by fields other than the identifier.
