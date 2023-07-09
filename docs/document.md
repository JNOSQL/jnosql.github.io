---
sort: 6
---

# Starting with Document

This guide will explain how to use a document database with JNoSQL.
A document-oriented database, or document store, is a computer program designed for storing, retrieving, and managing document-oriented information, also known as semi-structured data.
Document-oriented databases are one of the main categories of NoSQL databases, and the popularity of the term "document-oriented database" has grown with the use of the term NoSQL itself. XML databases are a subclass of document-oriented databases that are optimized to work with XML documents. Graph databases are similar, but add another layer, the relationship, which allows them to link documents for rapid traversal.

In a maven project, the first step is to add the dependencies. Where we'll add the Mapper dependency, think JPA to Document NoSQL, and then a communication dependency, think JDBC to Document NoSQL.

**1 Add the Eclipse JNoSQL Mapping dependency;**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.mapping</groupId>
   <artifactId>mapping-document</artifactId>
   <version>1.0.0-b5</version>
</dependency>
```

[Check here to take the latest version.](https://mvnrepository.com/artifact/org.eclipse.jnosql.mapping/mapping-document)

**Add a document vendor in the communication dependency, e.g.:**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.communication</groupId>
   <artifactId>mongodb-driver</artifactId>
   <version>1.0.0-b5</version>
</dependency>
```

**3 Use annotation to define both the Id and the entity name.**

Use annotation to define both the Id and the entity name. Note that here you'll need to also define what values are stored in columns with ```@Column``` annotations.

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

**4 Make an eligible DocumentCollectionManager using the ```@Produces``` methods in DocumentCollectionManager.**

```java
@ApplicationScoped
public class DocumentCollectionManagerProducer {

  private static final String COLLECTION = "developers";

  private DocumentConfiguration configuration;

  private DocumentManagerFactory managerFactory;

  @PostConstruct
  public void init() {
    configuration = new MongoDBDocumentConfiguration();
    Map<String, Object> settings = Collections.singletonMap("mongodb-server-host-1", "localhost:27017");
    managerFactory = configuration.get(Settings.of(settings));
  }


  @Produces
  public DocumentManager getManager() {
    return managerFactory.get(COLLECTION);

  }

}

```

```tip
Eclipse JNoSQL has tight integration with Eclipse MicroProfile Configuration, therefore, you can use this configuration instead of putting the configuration directly in the code.
```

**5 That's it! Now you're ready to go with CDI and a Key-Value NoSQL database.**

```java
public class App {


  public static void main(String[] args) {

    Random random = new Random();
    Long id = random.nextLong();
    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {

      Person person = Person.builder().
      withPhones(Arrays.asList("234", "432"))
      .withName("Name")
      .withId(id)
      .build();

      DocumentTemplate documentTemplate = container.select(DocumentTemplate.class).get();
      Person saved = documentTemplate.insert(person);
      System.out.println("Person saved" + saved);


      DocumentQuery query = select().from("Person")
      .where(eq(Document.of("_id", id))).build();

      Optional<Person> personOptional = documentTemplate.singleResult(query);
      System.out.println("Entity found: " + personOptional);

    }
  }

  private App() {
  }
}
```

```java
public class PersonService {

  @Inject
  private DocumentTemplate template;


  public Person insert(Person person) {
    return template.insert(person);
  }

  public Optional<Person> find(Long id) {
    DocumentQuery query = select().from("Person").where("id").eq(id).build();
    return template.singleResult(query);
  }
}
```

**6 Create your own repository.**

```java
public interface PersonRepository extends Repository<Person, Long> {

  List<Person> findByName(String name);

  Stream<Person> findByPhones(String phone);
}
```

Don't worry about the implementation, Eclipse JNoSQL will handle that for you.

```java
public class App2 {


  public static void main(String[] args) {

    Random random = new Random();
    Long id = random.nextLong();

    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {

      Person person = Person.builder().
      withPhones(Arrays.asList("234", "432"))
      .withName("Name")
      .withId(id)
      .build();

      PersonRepository repository = container.select(PersonRepository.class)
      .select(DatabaseQualifier.ofDocument()).get();
      repository.save(person);

      List<Person> people = repository.findByName("Name");
      System.out.println("Entity found: " + people);
      repository.findByPhones("234").forEach(System.out::println);

    }
  }

  private App2() {
  }
}

```

```java
public class PersonService {

  @Inject
  @Database(DatabaseType.DOCUMENT)
  private PersonRepository repository;


  public Person save(Person person) {
    return repository.save(person);
  }

  public Optional<Person> find(Long id) {
    return repository.findById(id);
  }
}
```
