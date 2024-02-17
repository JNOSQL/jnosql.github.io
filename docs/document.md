---
sort: 6
---

# Getting Started with Eclipse JNoSQL Document API

## 1. Introduction to Document NoSQL Databases
Document NoSQL databases are a type of NoSQL database that store data in a semi-structured document format, typically using JSON or BSON (binary JSON) documents. Each document can have its own structure and fields, providing flexibility in data modeling. Document databases are suitable for handling complex and evolving data structures and support powerful querying and indexing capabilities.

## 2. Minimum Requirements
Before you start using Eclipse JNoSQL Document API, ensure that your Java application meets the following minimum requirements:
- Java 17
- CDI 4.0 (Contexts and Dependency Injection)
- JSON-B 3.0 (Java API for JSON Binding)
- Eclipse MicroProfile Config

## 3. Choosing a Document NoSQL Database
Eclipse JNoSQL supports various Document NoSQL databases. You can find a list of supported databases, along with their configurations and dependencies, on the [GitHub repository](https://github.com/eclipse/jnosql-databases).

## 4. Adding Eclipse JNoSQL Dependency
To use a specific Document NoSQL database with Eclipse JNoSQL, you need to add the corresponding dependency to your project. For example, if you want to use MongoDB, add the following Maven dependency to your project's `pom.xml` file:

```xml
<dependency>
  <groupId>org.eclipse.jnosql.databases</groupId>
  <artifactId>jnosql-mongodb</artifactId>
  <version>1.1.0</version>
</dependency>
```

## 5. Configuring Database Credentials
Once you have added the appropriate dependency, you need to configure the credentials for your Document NoSQL database. These credentials typically include details such as the database name, host, port, and any required authentication credentials.

To obtain the necessary configuration settings, refer to the [GitHub repository](https://github.com/eclipse/jnosql-databases) mentioned earlier. For example, to configure MongoDB, you can find the credentials at: [MongoDB Configuration](https://github.com/eclipse/jnosql-databases#mongodb)

Below is an example of MongoDB credentials:

```properties
jnosql.document.database=olympus
jnosql.mongodb.host=localhost:27017
```

## 6. Setting up a Class with Annotations
To map your Document database with Eclipse JNoSQL, you need to set up a class with annotations that define it as an entity and specify which field will serve as the key. For example:

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

In the above example, the `@Entity` annotation marks the class as an entity with the specified collection (table) name, and the `@Id` annotation indicates the field that will serve as the key. The `@Column` annotation is used to map fields to document attributes.

## 7. Working with Eclipse JNoSQL Document API
Once you have configured the necessary dependencies, credentials, and set up the entity class, you can start using Eclipse JNoSQL Document API to interact with your database. Here are the basic steps to get started:

a. Inject the `DocumentTemplate`:
```java
@Inject
DocumentTemplate template;
```

b. Perform CRUD operations using the `DocumentTemplate`:
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

It is ready for use, and you don't need to work on the implementation; Eclipse JNoSQL will make your life easier.

Note: Document databases provide flexible querying capabilities based on document attributes.
