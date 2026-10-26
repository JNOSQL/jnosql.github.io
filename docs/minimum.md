---
layout: default
title: Minimum Requirements
sort: 3
nav_title: Minimum Requirements
nav_group: core
nav_icon: checklist
---

# Minimum Requirements

This page lists what Eclipse JNoSQL needs and explains how those technologies take part in the framework. It is a prerequisite guide, not a full tutorial.

## Requirements

Published Eclipse JNoSQL releases (1.1.x) are built for Java 17 and use these Jakarta EE and MicroProfile APIs:

- **Java 17** (or higher)
- [Jakarta Contexts and Dependency Injection 4.1](https://jakarta.ee/specifications/cdi/) (CDI)
- [Jakarta JSON Binding 3.0](https://jakarta.ee/specifications/jsonb/3.0/) (JSON-B)
- [Jakarta JSON Processing 2.1](https://jakarta.ee/specifications/jsonp/2.1/) (JSON-P)
- [MicroProfile Config 3.1](https://microprofile.io/specifications/config/)

These are the common requirements of the mapping-based integrations. Individual database integrations may add their own requirements, such as a driver, a server version, or extra configuration. See the [JNoSQL Databases repository](https://github.com/eclipse-jnosql/jnosql-databases) and the [Supported Databases](supported_dbs.html) page for provider-specific information.

**Note:** The Java version needed to build JNoSQL from source can be newer than the minimum needed to run a published release (the development branch of the framework already builds with a newer JDK). The values above are the minimums for published artifacts.

## Before You Begin

JNoSQL relies on Jakarta EE and MicroProfile technologies instead of inventing its own mechanisms for dependency injection and configuration. You do not need to be an expert, but this background makes JNoSQL easier to configure and use:

- Java and basic dependency management (for example, Maven).
- CDI concepts: managed beans and dependency injection.
- Externalized application configuration.

## Jakarta CDI — Managing Application Components

Applications are made of components that depend on each other. Constructing them by hand, including every template, repository, and connection setting, is repetitive and hard to change. With CDI, the runtime creates, configures, injects, and manages these components, and you declare what you need.

JNoSQL integrates with CDI so that its persistence components are available as beans. There are two entry points:

- **`Template`** — the common Jakarta NoSQL persistence abstraction (`jakarta.nosql.Template`) for programmatic operations such as insert, update, find, and delete.
- **Jakarta Data repositories** — interfaces annotated with `@Repository` that give a repository-based programming model, with JNoSQL providing the implementation.

Do not instantiate these CDI-managed components manually. Ask the container for them. A repository must be a valid declaration, and a JNoSQL implementation and database integration must be available for it. The container resolves the corresponding persistence implementation according to its discovery and lifecycle rules.

### Specialized Templates

`Template` is common to all models. JNoSQL also provides model-specific templates that add capabilities beyond the common abstraction: `KeyValueTemplate`, `DocumentTemplate`, `ColumnTemplate`, `GraphTemplate`, `TimeSeriesTemplate`, and `VectorTemplate`. They are injected the same way, for example:

```java
@Inject
DocumentTemplate template;
```

See the model guides for detailed usage: [Key-Value](key-value.html), [Wide-Column](column.html), [Document](document.html), [Graph](graph.html), [Time Series](time-series.html), and [Vector](vector.html).

## Running CDI in Java SE and Jakarta EE

Eclipse JNoSQL works in both environments with the same persistence programming model. The difference is who starts and manages CDI: Java SE applications explicitly start CDI and retrieve JNoSQL components, while Jakarta EE applications typically receive the same components through `@Inject`. Java SE applications can be enterprise-grade too; the distinction concerns runtime integration, not the importance or scalability of the application.

### Jakarta EE

In a compatible Jakarta EE runtime, the container initializes and manages CDI, so you can inject the components directly:

```java
@Inject
Template template;
```

```java
@Inject
ProductRepository repository;
```

You still need the JNoSQL modules and the database integration on the application classpath, unless the selected runtime supplies them.

### Java SE

A standalone application must provide a CDI implementation (for example, Weld SE or Apache OpenWebBeans). The CDI API dependency alone does not provide a working CDI runtime. The application starts the container, looks up the component, and closes the container when done:

```java
try (SeContainer container =
        SeContainerInitializer.newInstance().initialize()) {

    Template template = container.select(Template.class).get();
}
```

A Jakarta Data repository is obtained the same way:

```java
ProductRepository repository =
        container.select(ProductRepository.class).get();
```

The imports are `jakarta.enterprise.inject.se.SeContainer`, `jakarta.enterprise.inject.se.SeContainerInitializer`, and `jakarta.nosql.Template`.

**Note:** The JNoSQL model templates are registered as default beans, so `Template` resolves without a qualifier when exactly one model module (for example, only the Document module) is on the classpath. If several model modules are present, `Template` is ambiguous, and you should select the specific type, such as `DocumentTemplate`, instead.

### Comparison

| Java SE | Jakarta EE |
|---|---|
| CDI implementation must be provided | CDI is supplied by a compatible runtime |
| Explicit CDI bootstrap | Container-managed initialization |
| Standalone execution | Application deployment |
| Explicit runtime dependencies | Some APIs and services may be runtime-provided |

## CDI Bean Discovery

CDI must discover application components before they can be injected. A `beans.xml` file is a bean-archive descriptor that marks a JAR or WAR as a bean archive.

Conventional Maven locations depend on the packaging:

| Packaging | Location |
|---|---|
| JAR / Java SE | `src/main/resources/META-INF/beans.xml` |
| WAR / Jakarta EE | `src/main/webapp/WEB-INF/beans.xml` |

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="https://jakarta.ee/xml/ns/jakartaee"
       version="4.0"
       bean-discovery-mode="annotated">
</beans>
```

The `annotated` mode discovers classes that have a bean-defining annotation, such as `@ApplicationScoped`. This descriptor version is also accepted by CDI 4.1.

`beans.xml` is not universally mandatory:

- CDI supports implicit bean archives under its discovery rules, and classes with bean-defining annotations can take part in annotated discovery.
- Java SE and Jakarta EE differ in archive discovery. In CDI SE, implicit archive scanning without `beans.xml` has additional conditions that depend on the implementation and configuration.
- Including `beans.xml` is a simple and portable choice for examples and applications.
- It does not replace a CDI implementation or valid bean definitions.

Prefer `annotated` discovery. Avoid `bean-discovery-mode="all"` as a general fix, and note that it is not part of the CDI Lite model. For advanced rules, see the [CDI specification](https://jakarta.ee/specifications/cdi/).

## MicroProfile Config — Managing Configuration

Connection settings change between development, testing, and production, and the application should not need to be recompiled or repackaged for that. MicroProfile Config provides one mechanism to read configuration values from several sources. JNoSQL uses it to read database integration settings.

The conventional Maven location of the properties file is `src/main/resources/META-INF/microprofile-config.properties`, which is packaged on the application classpath:

```properties
jnosql.document.database=store
jnosql.mongodb.host=localhost:27017
```

This is only one source. MicroProfile Config merges several sources, and a higher priority overrides a lower one. The three default sources are:

| Source | Default Priority |
|---|---:|
| JVM system properties | 400 |
| Environment variables | 300 |
| `META-INF/microprofile-config.properties` | 100 |

### Overriding with a System Property

```bash
java -Djnosql.mongodb.host=database.example.com:27017 -jar app.jar
```

This is a generic illustration of overriding with a JVM system property; `app.jar` stands for your own application.

### Overriding with an Environment Variable

```bash
export JNOSQL_MONGODB_HOST=database.example.com:27017
```

MicroProfile Config maps a property name to an environment variable by replacing non-alphanumeric characters with `_` and, as a further fallback, converting the name to uppercase. So `jnosql.mongodb.host` can be set as `JNOSQL_MONGODB_HOST`.

### Practical Benefits

- Different settings per deployment environment.
- Containerized and cloud deployments.
- No hardcoded connection settings.

Do not commit sensitive credentials to source code. Environment variables are a deployment mechanism, not a complete secrets-management solution.

### API Versus Implementation

MicroProfile Config is a specification. Java SE applications must provide a compatible implementation (for example, SmallRye Config). Some Jakarta EE runtimes provide MicroProfile Config, but this depends on the runtime and the MicroProfile features it supports; do not assume every server includes it.

## JSON-B — Java Object Serialization

[Jakarta JSON Binding](https://jakarta.ee/specifications/jsonb/) converts Java objects to and from JSON. JNoSQL can use it in its mapping and serialization infrastructure, which is most visible in some Key-Value integrations, where an entity is serialized to JSON before being stored as the value:

```text
Java entity
    |
    v
JSON-B serialization
    |
    v
JSON representation
    |
    v
Key-Value database
```

This is one integration strategy, not the storage architecture of every provider. For example, the Redis and Valkey integrations use a JSON-B instance in their bucket managers, while other providers use native driver codecs or their own conversion mechanisms. JNoSQL databases do not all serialize entities as JSON. See [Serialization and Provider Differences](key-value.html#6-serialization-and-provider-differences) in the Key-Value guide.

## JSON-P — Processing JSON Data

[Jakarta JSON Processing](https://jakarta.ee/specifications/jsonp/) provides APIs to read, generate, and process JSON structures directly. It complements JSON-B: JSON-B maps between Java objects and JSON, while JSON-P works with JSON documents and structures.

JNoSQL users normally work with Java entities, templates, and repositories rather than JSON-P objects. JSON-P may still take part in the underlying JSON processing and integration infrastructure, but not every database integration uses it.

## How the Components Fit Together

| Component | Responsibility |
|---|---|
| CDI | Manages components and dependency injection |
| MicroProfile Config | Provides externalized database configuration |
| Jakarta JSON-B / JSON-P | Support JSON serialization, binding, and processing where applicable |
| Jakarta NoSQL / Jakarta Data | Provide the persistence programming model |
| Eclipse JNoSQL | Implements and integrates these capabilities with supported NoSQL database providers |

JSON-B and JSON-P are not mandatory stages of every database operation; they are used only by integrations that need them.
