# Eclipse JNoSQL

![JNoSQL Logo](http://www.jnosql.org/images/home_logo.png)

The Eclipse JNoSQL is a framework to help developers create enterprise-grade applications using Java and NoSQL technologies. It helps them create scalable applications while maintaining low coupling with the underlying NoSQL technology.

## What is Eclipse JNoSQL?

Eclipse JNoSQL is a Java framework that streamlines the integration of Java applications with NoSQL databases. It defines a set of APIs and provides a standard implementation for most NoSQL databases. This clearly helps to achieve very low coupling with the underlying NoSQL technologies used in applications.

The project has two layers:

1. _Communication Layer_: A set of APIs that defines communication with NoSQL databases. Compared with traditional the RDBMS world, they are like the JDBC API. It contains four modules, one for each NoSQL database type: Key-Value, Column Family, Document, and Graph.

1. _Mapping Layer_: These APIs help developers to integrate their Java application with the NoSQL database. This layer is annotation-driven and uses technologies like CDI and Bean Validation, making it simple for developers to use. In the traditional RDBMS world, this layer can be compared to the Java Persistence API or object-relational mapping frameworks such as Hibernate.

![](http://www.jnosql.org/images/layers.png)

### Key features

- Simple APIs supporting all well-known NoSQL storage types - Column Family, Key-Value Pair, Graph and Document databases.
- Use of Convention Over Configuration
- Support for Asynchronous Queries
- Support for Asynchronous Write operations
- Easy-to-implement API Specification and Test Compatibility Kit (TCK) for NoSQL Vendors

The API's focus is on simplicity and ease of use. Developers should only have to know a minimal set of artifacts to work with JNoSQL. The API is built on Java 8 features like Lambdas and Streams and therefore fits perfectly with the functional features of Java 8+.

### Eclipse JNoSQL - Communication

The _Eclipse JNoSQL - Communication_ project defines the standard APIs to communicate with NoSQL databases - this project works as a **NoSQL Database JDriver**.

Communication has four APIs, one for each NoSQL database storage type, and a TCK for each one. The Test Compatibility Kit (TCK) helps ensure that driver implementations adhere to API specifications. So if a key-value database driver implements and pass all its tests, it means that this database driver support the Communication key-value API.

### Eclipse JNoSQL - Mapping

The _Eclipse JNoSQL - Mapping_ project is an integration and mapping layer that helps developers integrate applications and works with Communication. The Mapping layer uses technologies such as Bean Validations and incorporates CDI capabilities, making integrations very simple and effective.

In other words: **Communication + CDI = Mapping**

Similar to Communication, Mapping also has separate modules for all well known NoSQL Database Storage types. With CDI at its heart, Mapping is a very powerful, yet simple, framework.

Key features of Mapping:

- Annotation Driven.
- Highly Customizable (reflection, caching, persistence flow, etc.)
- Observable events on the persistence flow
- Support for Interceptors, Injection and Validation
