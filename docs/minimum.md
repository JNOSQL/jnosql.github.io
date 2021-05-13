---
sort: 3
---

# Minimum Requirements

- Java 8 (or higher)
- [CDI](https://jcp.org/en/jsr/detail?id=365) implementation e.g.: [Weld](http://weld.cdi-spec.org/)
- [Bean Validation](https://jcp.org/en/jsr/detail?id=380) implementation e.g.: [Jakarta Bean Validation](http://beanvalidation.org/2.0/) (optional, required when enabling Jakarta Bean Validation with certified implementations, such as Hibernate Validator)
- [JSON-B](https://jcp.org/en/jsr/detail?id=367) implementation e.g.: [Jakarta JSON Binding (JSON-B)](http://json-b.net/) When it needs JSON binding to either read a JSON configuration's file, or it needs to serialize or deserialize values to a database implementation.
- [JSON-P](https://jcp.org/en/jsr/detail?id=374) implementation e.g.: [Java API for JSON Processing](https://javaee.github.io/jsonp/) When it needs JSON binding to either read a JSON configuration's file, or it needs to serialize or deserialize values to a database implementation.
