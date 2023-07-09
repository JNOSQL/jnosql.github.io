---
sort: 5
---

## 1. Introduction to Key-value NoSQL Databases

Key-value NoSQL databases are a type of NoSQL database that store data in a simple key-value format. In this model, each data item is stored as a key-value pair, where the key is unique and used to access the corresponding value. Key-value databases are highly scalable and provide fast access to data, making them suitable for use cases that require high throughput and low-latency data retrieval.

## 2. Minimum Requirements

Before you start using Eclipse JNoSQL Key-value API, ensure that your Java application meets the following minimum requirements:

-   Java 17
-   CDI 4.0 (Contexts and Dependency Injection)
-   JSON-B 3.0 (Java API for JSON Binding)
-   Eclipse MicroProfile Config

## 3. Choosing a Key-value NoSQL Database

Eclipse JNoSQL supports various Key-value NoSQL databases. You can find a list of supported databases, along with their configurations and dependencies, on the [GitHub repository](https://github.com/eclipse/jnosql-databases).

## 4. Adding Eclipse JNoSQL Dependency

To use a specific Key-value NoSQL database with Eclipse JNoSQL, you need to add the corresponding dependency to your project. For example, if you want to use Redis, add the following Maven dependency to your project's `pom.xml` file:

```xml
<dependency>
  <groupId>org.eclipse.jnosql.databases</groupId>
  <artifactId>jnosql-redis</artifactId>
  <version>1.0.0</version>
</dependency>
```

## 5. Configuring Database Credentials

Once you have added the appropriate dependency, you need to configure the credentials for your Key-value NoSQL database. These credentials typically include details such as the database name, host, port, and any required authentication credentials.

To obtain the necessary configuration settings, refer to the [GitHub repository](https://github.com/eclipse/jnosql-databases) mentioned earlier. For example, to configure Redis, you can find the credentials at: [Redis Configuration](https://github.com/eclipse/jnosql-databases#redis)

Below is an example of Redis credentials:


```properties
jnosql.keyvalue.database=developers
jnosql.redis.port=6379
jnosql.redis.host=localhost
```

## 6. Set up a class with annotations

```java
@Entity
public class User {

  @Id
  private String userName;

  private String name;

  private List<String> phones;
}
```

In the above example, the `@Entity` annotation marks the class as an entity, and the `@Id` annotation indicates the field that will serve as the key.

## 7. Inject the KeyValueTemplate:

```java
@Inject
KeyValueTemplate template; 
```

### Perform CRUD operations using the KeyValueTemplate:

```java
User user = User.builder().username("otaviojava").name("Otavio").phones(Arrays.asList("234", "432")).build();

// Save an entity
User userSaved = template.put(user);
System.out.println("User saved: " + userSaved);

// Retrieve an entity by key
Optional<User> retrievedUser = template.get("username", User.class);
System.out.println("Entity found: " + retrievedUser);` 
```

## 8. Optionally, create a repository interface using Jakarta Data:


```java
@Repository
public interface UserRepository extends CrudRepository<User, String> {}
```

## Inject and use the repository for CRUD operations:


```java
@Inject
UserRepository repository;

User user = User.builder().username("otaviojava").name("Otavio").phones(Arrays.asList("234", "432")).build();

// Save an entity
repository.save(user);

// Retrieve an entity by key
Optional<User> retrievedUser = repository.findById("username");
System.out.println("User found: " + retrievedUser);

// Check if an entity exists
System.out.println("The user found: " + repository.existsById("username"));
```

Note: Keep in mind that Key-value databases have limitations on querying by fields other than the identifier.