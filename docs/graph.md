---
sort: 7
---

# Getting Started with Eclipse JNoSQL Graph API

## 1. Introduction to Graph NoSQL Databases
Graph NoSQL databases are a type of NoSQL database that store data in a graph structure, consisting of nodes (vertices) and relationships (edges). Each node represents an entity, and the relationships define the connections between entities. Graph databases are ideal for handling highly connected data and performing complex graph-based queries.

## 2. Minimum Requirements
Before you start using Eclipse JNoSQL Graph API, ensure that your Java application meets the following minimum requirements:
- Java 17
- CDI 4.0 (Contexts and Dependency Injection)
- JSON-B 3.0 (Java API for JSON Binding)
- Eclipse MicroProfile Config
- Apache Tinkerpop (version 3.6.0 or higher)
- Database driver specific to the Graph database you are using

## 3. Choosing a Graph NoSQL Database
Eclipse JNoSQL supports various Graph NoSQL databases. You can find a list of supported databases, along with their configurations and dependencies, on the [GitHub repository](https://github.com/eclipse/jnosql-extensions#graph-connections).

## 4. Adding Eclipse JNoSQL Dependency
To use a specific Graph NoSQL database with Eclipse JNoSQL, you need to add the corresponding dependencies to your project. Firstly, you need to add the JNoSQL Graph connection dependency:

```xml
<dependency>
    <groupId>org.eclipse.jnosql.mapping</groupId>
    <artifactId>jnosql-graph-connections</artifactId>
    <version>1.0.1</version>
</dependency>
````

Also, you need to add other dependencies: the Apache Tinkerpop dependency, and the database driver dependency. For example, if you want to use Neo4J as your Graph database, add the following Maven dependencies to your project's `pom.xml` file :

```xml
<dependency>
    <groupId>org.eclipse.jnosql.mapping</groupId>
    <artifactId>jnosql-graph-connections</artifactId>
    <version>1.0.1</version>
</dependency>
<dependency>
    <groupId>org.apache.tinkerpop</groupId>
    <artifactId>gremlin-core</artifactId>
    <version>${tinkerpop.version}</version>
</dependency>
<dependency>
    <groupId>com.steelbridgelabs.oss</groupId>
    <artifactId>neo4j-gremlin-bolt</artifactId>
    <version>${neo4j.gremlin.version}</version>
</dependency>
<dependency>
    <groupId>org.neo4j.driver</groupId>
    <artifactId>neo4j-java-driver</artifactId>
    <version>${neo4j.version}</version>
</dependency>
```

## 5. Configuring Database Credentials
Once you have added the appropriate dependencies, you need to configure the credentials for your Graph NoSQL database. These credentials typically include details such as the host, port, username, and password.

To configure the database credentials, use the Eclipse MicroProfile Config settings. Below is an example of Neo4J credentials:

```
jnosql.neo4j.host=bolt://localhost:7687
jnosql.neo4j.user=neo4j
jnosql.neo4j.password=admin123
jnosql.graph.provider=org.eclipse.jnosql.mapping.graph.connections.Neo4JGraphConfiguration
```

## 6. Setting up a Class with Annotations
To map your Graph database with Eclipse JNoSQL, you need to set up a class with annotations that define it as an entity, specify which field will serve as the key, and mark other fields as persistable. For example:

```java
@Entity
public class Person {

  @Id
  private Long id;

  @Column
  private String name;

  @Column
  private int age;

  @Column
  private String occupation;

  @Column
  private Double salary;

}
```

In the above example, the `@Entity` annotation marks the class as an entity, the `@Id` annotation indicates the field that will serve as the key, and the `@Column` annotation is used to mark other fields as persistable attributes.

## 7. Working with Eclipse JNoSQL Graph API
Once you have configured the necessary dependencies, credentials, and set up the entity class, you can start using Eclipse JNoSQL Graph API to interact with your database. Here are the basic steps to get started:

a. Inject the `GraphTemplate`:
```java
@Inject
GraphTemplate template;
```

b. Perform Graph operations using the `GraphTemplate`:
```java
Person banner = template.insert(builder()
  .withAge(30)
  .withName("Banner")
  .withOccupation("Developer")
  .withSalary(3000D)
  .build());

Person natalia = template.insert(builder()
  .withAge(32)
  .withName("Natalia")
  .withOccupation("Developer")
  .withSalary(5000D)
  .build());

Person rose = template.insert(builder()
  .withAge(40)
  .withName("Rose")
  .withOccupation("Design")
  .withSalary(1000D)
  .build());

Person tony = template.insert(builder()
  .withAge(22)
  .withName("Tony")
  .withOccupation("Developer")
  .withSalary(4500D)
  .build());

template.edge(tony, "knows", rose).add("feel", "love");
template.edge(tony, "knows", natalia);

template.edge(natalia, "knows", rose);
template.edge(banner, "knows", rose);

List<Person> developers = template.getTraversalVertex()
  .has("salary", gte(3000D))
  .has("age", between(20, 25))
  .has("occupation", "Developer")
  .<Person>stream()
  .collect(toList());

List<Person> peopleWhoDeveloperKnows = template.getTraversalVertex()
  .has("salary", gte(3000D))
  .has("age", between(20, 25))
  .has("occupation", "Developer")
  .out("knows")
  .<Person>stream()
  .collect(toList());

List<Person> both = template.getTraversalVertex()
  .has("salary", gte(3000D))
  .has("age", between(20, 25))
  .has("occupation", "Developer")
  .outE("knows")
  .bothV()
  .<Person>stream()
  .distinct()
  .collect(toList());

List<Person> couple = template.getTraversalVertex()
.has("salary", gte(3_000D))
.has("age", between(20, 25))
.has("occupation", "Developer")
.outE("knows")
.has("feel", "love")
.bothV()
.<Person>stream()
.distinct()
.collect(toList());
```


If you want to explore the capability of Jakarta Data, you can also create a repository interface:


```java
@Repository
public interface PersonRepository extends CrudRepository<Person, String> {}

```
By injecting and using the repository, you can perform CRUD operations without needing to work on the implementation details.


```java
@Inject
PersonRepository repository;

Person person = Person.builder()
  .withPhones(Arrays.asList("234", "432"))
  .withName("Name")
  .withId(1)
  .build();

repository.save(person);

Optional<Person> retrievedPerson = repository.findById(1L);
```
