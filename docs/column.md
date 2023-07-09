---
sort: 6
---


# Getting Started with Eclipse JNoSQL Wide-column API

## 1. Introduction to Wide-column NoSQL Databases
Wide-column NoSQL databases, also known as column-family databases, are a type of NoSQL database that store data in a tabular format with columns and rows. Unlike traditional relational databases, wide-column databases allow flexible schema design and can handle vast amounts of structured and semi-structured data. They are suitable for use cases that require high scalability, fault-tolerance, and efficient querying.

## 2. Minimum Requirements
Before you start using Eclipse JNoSQL Wide-column API, ensure that your Java application meets the following minimum requirements:
- Java 17
- CDI 4.0 (Contexts and Dependency Injection)
- JSON-B 3.0 (Java API for JSON Binding)
- Eclipse MicroProfile Config

## 3. Choosing a Wide-column NoSQL Database
Eclipse JNoSQL supports various Wide-column NoSQL databases. You can find a list of supported databases, along with their configurations and dependencies, on the [GitHub repository](https://github.com/eclipse/jnosql-databases).

## 4. Adding Eclipse JNoSQL Dependency
To use a specific Wide-column NoSQL database with Eclipse JNoSQL, you need to add the corresponding dependency to your project. For example, if you want to use Cassandra, add the following Maven dependency to your project's `pom.xml` file:

```xml
<dependency>
  <groupId>org.eclipse.jnosql.databases</groupId>
  <artifactId>jnosql-cassandra</artifactId>
  <version>1.0.0</version>
</dependency>
```

## 5. Configuring Database Credentials
Once you have added the appropriate dependency, you need to configure the credentials for your Wide-column NoSQL database. These credentials typically include details such as the database name, host, port, and any required authentication credentials.

To obtain the necessary configuration settings, refer to the [GitHub repository](https://github.com/eclipse/jnosql-databases) mentioned earlier. For example, to configure Cassandra, you can find the credentials at: [Cassandra Configuration](https://github.com/eclipse/jnosql-databases#cassandra)

Below is an example of Cassandra credentials:

```properties
jnosql.column.database=developers
jnosql.cassandra.query.1=CREATE KEYSPACE IF NOT EXISTS developers WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};
jnosql.cassandra.query.2=CREATE COLUMNFAMILY IF NOT EXISTS developers.Person (id bigint PRIMARY KEY, name text, phones list<text>);
```

## 6. Setting up a Class with Annotations
To map your Wide-column database with Eclipse JNoSQL, you need to set up a class with annotations that define it as an entity and specify which field will serve as the key. For example:

```java
@Entity("Person")
public class Person {

  @Id("id")
  private long id;

  @Column
  private String name;

  @Column
  private List<String> phones;
}
```

In the above example, the `@Entity` annotation marks the class as an entity with the specified table name, and the `@Id` annotation indicates the field that will serve as the key. The `@Column` annotation is used to map fields to columns.

## 7. Working with Eclipse JNoSQL Wide-column API
Once you have configured the necessary dependencies, credentials, and set up the entity class, you can start using Eclipse JNoSQL Wide-column API to interact with your database. Here are the basic steps to get started:

a. Inject the `ColumnTemplate`:
```java
@Inject
ColumnTemplate template;
```

b. Perform CRUD operations using the `ColumnTemplate`:

```java
Person person = Person.builder()
  .withPhones(Arrays.asList("234", "432"))
  .withName("Name")
  .withId(1).build();

// Insert an entity
Person saved = template.insert(person);

// Find an entity by key
Optional<Person> retrievedPerson = template.find(Person.class, 1L);
```

c. Optionally, create a repository interface using Jakarta Data:
```java
@Repository
public interface PersonRepository extends CrudRepository<Person, String> {}
```

d. Inject and use the repository for CRUD operations:
```java
@Inject
PersonRepository repository;

Person person = Person.builder()
  .withPhones(Arrays.asList("234", "432"))
  .withName("Name")
  .withId(1).build();

// Save an entity
repository.save(person);

// Retrieve an entity by key
Optional<Person> retrievedPerson = repository.findById(1L);
```

Note: Wide-column databases have limitations on querying by fields other than the identifier.

## 8. Further Exploration

The above steps provide a basic starting point for using Eclipse JNoSQL Wide-column API with a Wide-column NoSQL database. You can explore the official documentation of Eclipse JNoSQL and the specific documentation for your chosen database to learn more about advanced features, querying options, performance optimization, and other relevant topics.

Refer to the documentation and resources specific to the database you are using for any additional configuration or database-specific operations.
