---
sort: 5
---

# Starting with Key-Value

This guide will explain how to use a key-value database with JNoSQL.
A key–value database is a data storage paradigm designed for storing, retrieving, and managing associative arrays, and a data structure more commonly known today as a dictionary or hash table. Dictionaries contain a collection of objects, or records, which in turn have many different fields within them, each containing data. These records are stored and retrieved using a key that uniquely identifies the record, and is used to find the data within the database.

In a maven project, the first step is to add the dependencies. Where we'll add the Mapper dependency, think JPA to Key-value NoSQL, and then a communication dependency, think JDBC to Key-value NoSQL.

**1 Add the Eclipse JNoSQL Artemis dependency;**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.artemis</groupId>
   <artifactId>artemis-key-value</artifactId>
   <version>version</version>
</dependency>
```

[Check here to take the latest version.](https://mvnrepository.com/artifact/org.eclipse.jnosql.artemis/artemis-key-value)

**Add a key-value vendor in the communication dependency, e.g.:**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.diana</groupId>
   <artifactId>hazelcast-driver</artifactId>
   <version>version</version>
</dependency>
```

**3 Use annotation to define both the ```@Id``` and the entity name.**

```java
@Entity
public class User implements Serializable {

  @Id
  private String userName;

  private String name;

  private List<String> phones;
  //Getters and setters are not required.
  //However, the class must have a non-private constructor with no arguments.
}
```

**4 Create an eligible BucketManager using the ```@Produces``` methods in BucketManager.**

```java
@ApplicationScoped
public class BucketManagerProducer {

  private static final String BUCKET = "developers";

  private KeyValueConfiguration configuration;

  private BucketManagerFactory managerFactory;

  @PostConstruct
  public void init() {
    configuration = new HazelCastKeyValueConfiguration();
    Map<String, Object> settings = singletonMap("hazelcast-instanceName", "hazelcast");
    managerFactory = configuration.get(Settings.of(settings));
  }

  @Produces
  public BucketManager getManager() {
    return managerFactory.getBucketManager(BUCKET);
  }
}
```

```tip
Eclipse JNoSQL has tight integration with Eclipse MicroProfile Configuration, therefore, you can use this configuration instead of putting the configuration directly in the code.
```

**5 That's it! Now you're ready to go with CDI and a Key-Value NoSQL database.**

```java
public class App {

  private static final User USER = User.builder().
  withPhones(Arrays.asList("234", "432"))
  .withUsername("username")
  .withName("Name")
  .build();

  public static void main(String[] args) {

    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {
      KeyValueTemplate keyValueTemplate = container.select(KeyValueTemplate.class).get();
      User userSaved = keyValueTemplate.put(USER);
      System.out.println("User saved: " + userSaved);
      Optional<User> user = keyValueTemplate.get("username", User.class);
      System.out.println("Entity found: " + user);
    }
  }

  private App() {
  }
}
```

```java
public class UserService {

  @Inject
  private KeyValueTemplate template;


  public User put(User user) {
    return template.put(user);
  }

  public Optional<User> find(String id) {
    return template.get(id, User.class);
  }
}
```

**6 Create your own repository.**

```java
public interface UserRepository extends Repository<User, String> {}
```

Don't worry about the implementation, Eclipse JNoSQL will handle that for you.

```java
public class App2 {

  private static final User USER = User.builder().
  withPhones(Arrays.asList("234", "432"))
  .withUsername("username")
  .withName("Name")
  .build();

  public static void main(String[] args) {

    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {

      UserRepository repository = container.select(UserRepository.class, DatabaseQualifier.ofKeyValue()).get();
      repository.save(USER);
      Optionaly<User> user = repository.findById("username");
      System.out.println("User found: " + user);
      System.out.println("The user found: " + repository.existsById("username"));
    }
  }

  private App2() {
  }
}

```

```java
public class UserService {

  @Inject
  @Database(DatabaseType.KEY_VALUE)
  private UserRepository repository;


  public User save(User user) {
    return repository.save(user);
  }

  public Optional<User> find(String id) {
    return repository.findById(id);
  }
}
```
