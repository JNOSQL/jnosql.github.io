---
sort: 9
---

# Annotations

The Mapping API is annotation driven; therefore, it has annotations that make the Java developer life easier; these annotations have two categories:

* Annotation Models
* Qualifier annotation


## Annotation Models


The annotation model is to convert the entity model, a Java POJO, to/from the communication layer, as JPA does:

* Entity
* Column
* MappedSuperclass
* Id
* Embeddable
* Convert

The JNoSQL Mapping does not require the getter and setter methods to the fields, however, the Entity class must have a non-private constructor with no parameters.

### Entity

This annotation defined as a class eligible for the Mapping layer in JNoSQL.
The default value is the simple name of a class, for example, given the `org.jnosql.demo.Person` class the default name will `Person`.

```java
@Entity
public class Person {
}
```

```java
@Entity("name")
public class Person {
}
```

### Column

This annotation of each field will be stored in the database, the exception is the Key-value database where, usually, store the whole object as BLOB or JSON.

```java
@Entity
public class Person {
    @Column
    private String nickname;
    @Column
    private String name;
    @Column
    private List<String> phones;
    //ignored
    private String address;
//getter and setter
}
```

### MappedSuperclass

If this annotation is on the parent class, Mapping will persist its information as well. So beyond the son class, Artemis will store any field that is in Parent class with ```@Column``` annotation.

```java
@Entity
public class Dog extends Animal {

    @Column
    private String name;
    //getter and setter

}

@MappedSuperclass
public class Animal {

    @Column
    private String race;

    @Column
    private Integer age;

    //getter and setter

}
```

```tip
On this sample above, when saves a `Dog` instance, it saves the `Animal` case too, explicitly will save the fields `name`, `race` and `age`.
```

### Id

It shows which attribute is the id or the key in key-value types. Thus the value will be the remaining information. The way of storing the class will depend on the database driver.

```java
@Entity
public class User implements Serializable {

    @Id
    private String userName;

    private String name;

    private List<String> phones;
    }
```

### Embeddable

Defines a class whose instances are stored as an intrinsic part of an owning entity and share the object's identity. When converts an Embeddable instance to either saves or update, this will be either subdocument or subcolumn.

```java
@Entity
public class Book {

    @Column
    private String name;

    @Column
    private Author author;

//getter and setter

}

@Embeddable
public class Author {

    @Column
    private String name;

    @Column
    private Integer age;

//getter and setter

}
```

### Convert

This annotation teachs do Mapping layer how the field will be converted to/from the database. The Converter annotation has a parameter, and an `AttributeConverter` implementation class can be used. Eg. The sample below shows how to create a converter to a custom Money class.

```java
@Entity
public class Worker {
    @Column
    private String name;
    @Column
    private Job job;
    @Column("money")
    @Convert(MoneyConverter.class)
    private Money salary;
//getter and setter
}

public class MoneyConverter implements AttributeConverter<Money, String>{
    @Override
    public String convertToDatabaseColumn(Money attribute) {
        return attribute.toString();
    }
    @Override
    public Money convertToEntityAttribute(String dbData) {
        return Money.parse(dbData);
    }
}
public class Money {
    private final String currency;

    private final BigDecimal value;

//....
}
```

# Qualifier annotation

That is important to work with more than one type of the same application.

```java
@Inject
private DocumentRepository repositoryA;
@Inject
private DocumentRepository repositoryB;
```

Two injections with the same interface, CDI throws an ambiguous exception. There is a `Database` qualifier to fix this problem. It has two attributes:

- **DatabaseType**: The database type, key-value, document, column, graph.
- **provider**: The provider database name, eg. "cassandra, "hbase", "mongodb". So using the `Database` qualifier:

```java
@Inject
@Database(value = DatabaseType.DOCUMENT, provider = “databaseA”)
private DocumentRepository repositoryA;
@Inject
@Database(value = DatabaseType.DOCUMENT, provider = “databaseB”)
private DocumentRepository repositoryB;
```

Beyond this annotation, the producer method with the entity manager is required.
The benefits of using this qualifier instead of creating a new one are that if the Manager Entity is produced using Database as a qualifier, Mapping layer will create classes such as DocumentRepository, ColumnRepository, etc., automatically.