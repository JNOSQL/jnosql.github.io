---
sort: 10
---

# Eclipse MicroProfile Config

JNoSQL has support to overwrite and receive credentials settings through an environment that follows the [Third factor](https://12factor.net/config) of The [12 Factor App](https://12factor.net/). It is thanks to [Eclipse MicroProfile Configuration](https://github.com/eclipse/microprofile-config).

## Document

Within the Document API it is possible to inject the following questions:

* DocumentTemplate
* DocumentCollectionManager
* DocumentCollectionManagerFactory

E.g.:

```java
@Inject
@ConfigProperty(name = "document")
private DocumentTemplate template;

@Inject
@ConfigProperty(name = "document")
private DocumentCollectionManager manager;

@Inject
@ConfigProperty(name = "document")
private DocumentCollectionManagerFactory factory;
```

The `name` attribute within the` ConfigProperty` annotation indicates the prefix used to search for credentials and settings information. For example, given the example above using the name `document`, it will be necessary to have a similar structure below:

```properties
document=document
document.settings.key=value
document.settings.key2=value2
document.database=database
document.provider=org.eclipse.jnosql.mapping.document.configuration.DocumentConfigurationMock
```

Where:

* `prefix.settings.*`: Indicates the settings that will be injected into the provider, for example, there will be a property `key` with value` value` and another `key2` with value` value2`.
* `prefix.provider`: Defines the qualifield of the configuration class, in this case, classes that implement `DocumentConfiguration`
* `prefix.database`: The database name.

## Column

Within the Column API it is possible to inject the following questions:

* ColumnTemplate
* ColumnFamilyManager
* ColumnFamilyManagerFactory

E.g.:

```java
@Inject
@ConfigProperty(name = "column")
private ColumnTemplate template;

@Inject
@ConfigProperty(name = "column")
private ColumnFamilyManager manager;

@Inject
@ConfigProperty(name = "column")
private ColumnFamilyManagerFactory factory;
```

The `name` attribute within the` ConfigProperty` annotation indicates the prefix used to search for credentials and settings information. For example, given the example above using the name `column`, it will be necessary to have a similar structure below:

```properties
column=column
column.settings.key=value
column.settings.key2=value2
column.database=database
column.provider=org.eclipse.jnosql.mapping.column.configuration.ColumnConfigurationMock
```

Where:

* `prefix.settings.*`: Indicates the settings that will be injected into the provider, for example, there will be a property `key` with value` value` and another `key2` with value` value2`.
* `prefix.provider`: Defines the qualifield of the configuration class, in this case, classes that implement `ColumnConfiguration`
* `prefix.database`: The database name.

## Key-Value

Within the Key-value API it is possible to inject the following questions:

* KeyValueTemplate
* BucketManager
* BucketManagerFactory

E.g.:

```java
@Inject
@ConfigProperty(name = "keyvalue")
private KeyValueTemplate template;

@Inject
@ConfigProperty(name = "keyvalue")
private BucketManager manager;

@Inject
@ConfigProperty(name = "keyvalue")
private BucketManagerFactory factory;
```

The `name` attribute within the` ConfigProperty` annotation indicates the prefix used to search for credentials and settings information. For example, given the example above using the name `keyvalue`, it will be necessary to have a similar structure below:

```properties
keyvalue=keyvalue
keyvalue.settings.key=value
keyvalue.settings.key2=value2
keyvalue.database=bucket
keyvalue.provider=org.eclipse.jnosql.mapping.keyvalue.configuration.KeyValueConfigurationMock
```

Where:

* `prefix.settings.*`: Indicates the settings that will be injected into the provider, for example, there will be a property `key` with value` value` and another `key2` with value` value2`.
* `prefix.provider`: Defines the qualifield of the configuration class, in this case, classes that implement `ColumnConfiguration`
* `prefix.database`: The database name.
* 
## Graph

Within the Graph API it is possible to inject the following questions:

* Graph
* GraphTemplate

E.g.:

```java
@Inject
@ConfigProperty(name = "graph")
private GraphTemplate template;

@Inject
@ConfigProperty(name = "graph")
private Graph graph;
```

The `name` attribute within the` ConfigProperty` annotation indicates the prefix used to search for credentials and settings information. For example, given the example above using the name `graph`, it will be necessary to have a similar structure below:

```properties
graph=graph
graph.settings.key=value
graph.settings.key2=value2
graph.provider=org.eclipse.jnosql.mapping.graph.configuration.GraphConfigurationMock
```

Where:

* `prefix.settings.*`: Indicates the settings that will be injected into the provider, for example, there will be a property `key` with value` value` and another `key2` with value` value2`.
* `prefix.provider`: Defines the qualifield of the configuration class, in this case, classes that implement `ColumnConfiguration`