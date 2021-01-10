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

The `name` attribute within the` ConfigProperty` annotation indicates the prefix used to search for credentials and settings information. For example, given the example above using the name `document`, it will be necessary to have a similar structure below:

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