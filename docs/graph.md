---
sort: 8
---

# Starting with Graph

This guide will explain how to use a Graph database with JNoSQL.
In computing, a graph database (GDB) is a database that uses graph structures for semantic queries with nodes, edges, and properties to represent and store data. A key concept of the system is the graph (or edge or relationship). The graph relates the data items in the store to a collection of nodes and edges, the edges representing the relationships between the nodes. The relationships allow data in the store to be linked together directly and, in many cases, retrieved with one operation. Graph databases hold the relationships between data as a priority. Querying relationships is fast because they are perpetually stored in the database. Relationships can be intuitively visualized using graph databases, making them useful for heavily inter-connected data.

In a maven project, the first step is to add the dependencies. Where we'll add the Mapper dependency, think JPA to Graph NoSQL, and then a communication dependency, think JDBC to Document NoSQL. Where we're using [Apache Tinkerpop](https://tinkerpop.apache.org/).

**1 Add the Eclipse JNoSQL Artemis dependency;**

```xml
<dependency>
   <groupId>org.eclipse.jnosql.artemis</groupId>
   <artifactId>artemis-graph</artifactId>
   <version>version</version>
</dependency>
```

[Check here to take the latest version.](https://mvnrepository.com/artifact/org.eclipse.jnosql.artemis/artemis-graph)

**Choose any graph with TinkerPop support, e.g:**

```xml
<dependency>
   <groupId>org.apache.tinkerpop</groupId>
   <artifactId>gremlin-core</artifactId>
   <version>version</version>
<dependency>
<dependency>
   <groupId>org.apache.tinkerpop</groupId>
   <artifactId>gremlin-groovy</artifactId>
   <version>version</version>
<dependency>
<dependency>
   <groupId>org.janusgraph</groupId>
   <artifactId>janusgraph-core</artifactId>
   <version>version</version>
<dependency>
<dependency>
   <groupId>org.janusgraph</groupId>
   <artifactId>janusgraph-berkeleyje</artifactId>
   <version>version</version>
<dependency>
<dependency>
   <groupId>org.janusgraph</groupId>
   <artifactId>janusgraph-lucene</artifactId>
   <version>version</version>
<dependency>
```

**3 Use annotation to define both the Id and the entity name.**

Use annotation to define both the Id and the entity name. Note that here you'll need to also define what values are stored in columns with ```@Column``` annotations.

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
  //Getters and setters are not required.
  //However, the class must have a non-private constructor with no parameters.
}
```

**4 Make an eligible ```@Graph``` using the @Produces method.**

```java
@ApplicationScoped
public class GraphProducer {

  private static final String FILE_CONF = "conf/janusgraph-berkeleyje-lucene.properties";

  private Graph graph;


  @PostConstruct
  public void init() {
    JanusGraph janusGraph = JanusGraphFactory.open(FILE_CONF);
    GraphTraversalSource g = janusGraph.traversal();
    if (g.V().count().next() == 0) {
      GraphOfTheGodsFactory.load(janusGraph);
    }
    this.graph = janusGraph;
  }

  @Produces
  @ApplicationScoped
  public Graph getGraph() {
    return graph;
  }

  public void close(@Disposes Graph graph) throws Exception {
    graph.close();
  }
}
```

```tip
Eclipse JNoSQL has tight integration with Eclipse MicroProfile Configuration, therefore, you can use this configuration instead of putting the configuration directly in the code.
```

**5 That's it! Now you're ready to go with CDI and a Graph NoSQL database.**

```java
public final class MarketingApp {


  private MarketingApp() {
  }


  public static void main(String[] args) {

    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {
      GraphTemplate graph = container.select(GraphTemplate.class).get();

      Person banner = graph.insert(builder().withAge(30).withName("Banner")
      .withOccupation("Developer").withSalary(3_000D).build());

      Person natalia = graph.insert(builder().withAge(32).withName("Natalia")
      .withOccupation("Developer").withSalary(5_000D).build());

      Person rose = graph.insert(builder().withAge(40).withName("Rose")
      .withOccupation("Design").withSalary(1_000D).build());

      Person tony = graph.insert(builder().withAge(22).withName("tony")
      .withOccupation("Developer").withSalary(4_500D).build());


      graph.edge(tony, "knows", rose).add("feel", "love");
      graph.edge(tony, "knows", natalia);

      graph.edge(natalia, "knows", rose);
      graph.edge(banner, "knows", rose);

      List<Person> developers = graph.getTraversalVertex()
      .has("salary", gte(3_000D))
      .has("age", between(20, 25))
      .has("occupation", "Developer")
      .<Person>stream().collect(toList());

      List<Person> peopleWhoDeveloperKnows = graph.getTraversalVertex()
      .has("salary", gte(3_000D))
      .has("age", between(20, 25))
      .has("occupation", "Developer")
      .out("knows")
      .<Person>stream().collect(toList());

      List<Person> both = graph.getTraversalVertex()
      .has("salary", gte(3_000D))
      .has("age", between(20, 25))
      .has("occupation", "Developer")
      .outE("knows")
      .bothV()
      .<Person>stream()
      .distinct()
      .collect(toList());

      List<Person> couple = graph.getTraversalVertex()
      .has("salary", gte(3_000D))
      .has("age", between(20, 25))
      .has("occupation", "Developer")
      .outE("knows")
      .has("feel", "love")
      .bothV()
      .<Person>stream()
      .distinct()
      .collect(toList());

      System.out.println("Developers has salary greater than 3000 and age between 20 and 25: " + developers);
      System.out.println("Person who the Developers target know: " + peopleWhoDeveloperKnows);
      System.out.println("The person and the developers target: " + both);
      System.out.println("Developers to Valentine days: " + couple);

    }
  }

}
```

```java
public class PersonService {

  @Inject
  private GraphTemplate template;


  public Person insert(Person person) {
    return template.insert(person);
  }

  public Optional<Person> find(Long id) {
    return template.find(id);
  }
  public EdgeEntity<Person, Person> meet(Person personA, Person personB) {
    return template.edge(personA, "knows", personB);
  }
}
```

**6 Create your own repository.**

```java
public interface PersonRepository extends Repository<Person, Long> {

  Stream<Person> findByOccupationAndSalaryGreaterThan(String ocuppation, Double salary);

  Stream<Person> findByAgeBetween(Integer ageA, Integer ageB);
}
```

Don't worry about the implementation, Eclipse JNoSQL will handle that for you.

```java
public final class MarketingApp2 {


  private MarketingApp2() {
  }


  public static void main(String[] args) {

    try (SeContainer container = SeContainerInitializer.newInstance().initialize()) {
      PersonRepository repository = container.select(PersonRepository.class, DatabaseQualifier.ofGraph()).get();

      Person banner = repository.save(builder().withAge(30).withName("Banner")
      .withOccupation("Developer").withSalary(3_000D).build());

      Person natalia = repository.save(builder().withAge(32).withName("Natalia")
      .withOccupation("Developer").withSalary(5_000D).build());

      Person rose = repository.save(builder().withAge(40).withName("Rose")
      .withOccupation("Design").withSalary(1_000D).build());

      Person tony = repository.save(builder().withAge(22).withName("tony")
      .withOccupation("Developer").withSalary(4_500D).build());


      System.out.println("findByOccupationAndSalaryGreaterThan");
      repository.findByOccupationAndSalaryGreaterThan("Developer", 3_000D)
      .forEach(System.out::println);
      System.out.println("findByAgeBetween");
      repository.findByAgeBetween(20, 30)
      .forEach(System.out::println);


    }
  }

}

```

```java
public class PersonService {

  @Inject
  @Database(DatabaseType.GRAPH)
  private PersonRepository repository;


  public Person save(Person person) {
    return repository.save(person);
  }

  public Optional<Person> find(Long id) {
    return repository.findById(id);
  }
}
```
