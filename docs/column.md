---
sort: 6
---

# Starting with Column

This guide will explain how to use a column database with JNoSQL.
A wide-column store (or extensible record stores) is a type of NoSQL database. It uses tables, rows, and columns, but unlike a relational database, the names and format of the columns can vary from row to row in the same table. A wide-column store can be interpreted as a two-dimensional key–value store.

In a maven project, the first step is to add the dependencies. Where we'll add the Mapper dependency, think JPA to Column NoSQL, and then a communication dependency, think JDBC to Column NoSQL.

**1 Add the Eclipse JNoSQL Artemis dependency;**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.artemis</groupId>
   <artifactId>artemis-column</artifactId>
   <version>version</version>
</dependency>
```

[Check here to take the latest version.](https://mvnrepository.com/artifact/org.eclipse.jnosql.artemis/artemis-column)

**Add a column vendor in the communication dependency, e.g.:**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.diana</groupId>
    <artifactId>cassandra-driver</artifactId>
   <version>version</version>
</dependency>
```

**3 Use annotation to define both the Id and the entity name.**

Use annotation to define both the Id and the entity name. Note that here you'll need to also define what values are stored in columns with @Column annotations.

```java
@Entity("Person")
public class Person {

  @Id("id")
  private long id;

  @Column
  private String name;

  @Column
  private List<String> phones;
  //Getters and setters are not required.
  //However, the class must have a non-private constructor with no arguments.
}
```

**4 Make an eligible ColumnFamilyManager using the Producer methods in ColumnFamilyManager.**

```java
@ApplicationScoped
public class ColumnFamilyManagerProducer {

  private static final String KEY_SPACE = "developers";

  private ColumnConfiguration cassandraConfiguration;

  private ColumnFamilyManagerFactory managerFactory;

  @PostConstruct
  public void init() {
    cassandraConfiguration = new CassandraConfiguration();
    managerFactory = cassandraConfiguration.get();
  }


  @Produces
  public ColumnFamilyManager getManagerCassandra() {
    return managerFactory.get(KEY_SPACE);
  }

}

```

```tip
Eclipse JNoSQL has tight integration with Eclipse MicroProfile Configuration, therefore, you can use this configuration instead of putting the configuration directly in the code.
```

**5 That's it! Now you're ready to go with CDI and a Key-Value NoSQL database.**

```java
public class App {

  private static final Person PERSON = Person.builder().
  withPhones(Arrays.asList("234", "432"))
  .withName("Name")
  .withId(1)
  .withIgnore("Just Ignore").build();

  public static void main(String[] args) {

    try(SeContainer container = SeContainerInitializer.newInstance().initialize()) {
      ColumnTemplate columnTemplate =  container.select(CassandraTemplate.class).get();
      Person saved = columnTemplate.insert(PERSON);
      System.out.println("Person saved" + saved);


      ColumnQuery query = select().from("Person").where(eq(Column.of("id", 1L))).build();

      Optional<Person> person = columnTemplate.singleResult(query);
      System.out.println("Entity found: " + person);

    }
  }

  private App() {
  }
}

```

```java
public class PersonService {

  @Inject
  private ColumnTemplate template;


  public Person insert(Person person) {
    return template.insert(person);
  }

  public Optional<Person> find(Long id) {
    ColumnQuery query = select().from("Person").where("id").eq(id).build();
    return template.singleResult(query);
  }
}
```

**6 Create your own repository.**

```java
public interface PersonRepository extends Repository<Person, Long> {}
```

Don't worry about the implementation, Eclipse JNoSQL will handle that for you.

```java
public class App2 {

  private static final Person PERSON = Person.builder().
  withPhones(Arrays.asList("234", "432"))
  .withName("Name")
  .withId(1)
  .build();

  public static void main(String[] args) {

    try(SeContainer container = SeContainerInitializer.newInstance().initialize()) {
      PersonRepository repository = container.select(PersonRepository.class).select(ofColumn()).get();
      Person saved = repository.save(PERSON);
      System.out.println("Person saved" + saved);

      Optional<Person> person = repository.findById(1L);
      System.out.println("Entity found: " + person);

    }
  }

  private App2() {
  }
}

```

```java
public class PersonService {

  @Inject
  @Database(DatabaseType.COLUMN)
  private PersonRepository repository;


  public Person save(Person person) {
    return repository.save(person);
  }

  public Optional<Person> find(Long id) {
    return repository.findById(id);
  }
}
```
