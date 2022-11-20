# Eclipse JNoSQL

![JNoSQL Logo](http://www.jnosql.org/images/home_logo.png)

== Introduction

Jakarta NoSQL is a Java framework that streamlines the integration of Java applications with NoSQL databases.

== Goals

* Increase productivity performing common NoSQL operations
* Rich Object Mapping integrated with Contexts and Dependency Injection (CDI)
* Java-based Query and Fluent-API
* Persistence lifecycle events
* Low-level mapping using Standard NoSQL APIs
* Specific template API to each NoSQL category
* Annotation-oriented using JPA-like naming when it makes sense
* Extensible to explore the particular behavior of a NoSQL database
* Explore the popularity of Apache TinkerPop in Graph API

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
