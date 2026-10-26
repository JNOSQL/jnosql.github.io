---
layout: default
title: Minimum Requirements
sort: 3
nav_title: Minimum Requirements
nav_group: core
nav_icon: checklist
---

# Minimum Requirements

Eclipse JNoSQL requires Java 17 or higher and the following Jakarta EE and MicroProfile APIs:

- **Java 17** (or higher)
- [Jakarta Contexts and Dependency Injection 4.0](https://jakarta.ee/specifications/cdi/4.0/) (CDI)
- [Jakarta JSON Binding 3.0](https://jakarta.ee/specifications/jsonb/3.0/) (JSON-B)
- [Jakarta JSON Processing 2.1](https://jakarta.ee/specifications/jsonp/2.1/) (JSON-P)
- [MicroProfile Config](https://microprofile.io/microprofile-config/)

These are the common platform requirements for JNoSQL's mapping-based integrations. Individual database providers may introduce additional dependencies, configuration, or runtime requirements.

See the [JNoSQL Databases repository](https://github.com/eclipse-jnosql/jnosql-databases) for database-specific details.

**Note:** Building Eclipse JNoSQL from source may require a newer JDK than the minimum needed to run a published release. Consult the corresponding release documentation for the applicable Java and API versions.
