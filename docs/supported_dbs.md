---
layout: default
title: Supported Databases
sort: 2
---

# Supported Databases

Eclipse JNoSQL provides a common programming model for multiple NoSQL database technologies while preserving database-specific capabilities when needed.

The supported databases are organized by data model. Some databases support more than one model and therefore appear in multiple categories.

For installation, configuration, examples, and database-specific features, see the
<a href="https://github.com/eclipse-jnosql/jnosql-databases"
target="_blank"
rel="noopener noreferrer">
Eclipse JNoSQL Databases documentation
</a>.

## Key-Value

Key-value databases organize data as values addressed by unique keys. This model is well suited to direct lookups, caching, session data, and other access patterns where applications retrieve a value by its key.

<div class="database-grid">

  <div class="database-card">
    <img src="/img/logos/ArangoDB.png" alt="ArangoDB" />
    <h3>ArangoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/couchbase.svg" alt="Couchbase" />
    <h3>Couchbase</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/dynamodb.png" alt="DynamoDB" />
    <h3>DynamoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/hazelcast.svg" alt="Hazelcast" />
    <h3>Hazelcast</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hazelcast"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hazelcast/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/infinispan.svg" alt="Infinispan" />
    <h3>Infinispan</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#infinispan"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-infinispan/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/memcached.png" alt="Memcached" />
    <h3>Memcached</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#memcached"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-memcached/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/oracle.png" alt="Oracle NoSQL" />
    <h3>Oracle NoSQL</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/redis.png" alt="Redis" />
    <h3>Redis</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#redis"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-redis/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/riak.png" alt="Riak" />
    <h3>Riak</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#riak"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-riak/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/valkey.png" alt="Valkey" />
    <h3>Valkey</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#valkey"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-valkey/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

</div>

## Column

Column databases organize related values into rows and columns and are designed for distributed, scalable access to large datasets.

<div class="database-grid">

  <div class="database-card">
    <img src="/img/logos/cassandra.png" alt="Apache Cassandra" />
    <h3>Apache Cassandra</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#cassandra"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-cassandra/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/hbase.png" alt="Apache HBase" />
    <h3>Apache HBase</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hbase"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hbase/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

</div>

## Document

Document databases store data as self-contained documents. They provide flexible structures while supporting queries over document fields.

<div class="database-grid">

  <div class="database-card">
    <img src="/img/logos/ArangoDB.png" alt="ArangoDB" />
    <h3>ArangoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/couchbase.svg" alt="Couchbase" />
    <h3>Couchbase</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/couchdb.png" alt="Apache CouchDB" />
    <h3>Apache CouchDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchdb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchdb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/dynamodb.png" alt="DynamoDB" />
    <h3>DynamoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/elastic.svg" alt="Elasticsearch" />
    <h3>Elasticsearch</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#elasticsearch"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-elasticsearch/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/mongodb.png" alt="MongoDB" />
    <h3>MongoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#mongodb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-mongodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/oracle.png" alt="Oracle NoSQL" />
    <h3>Oracle NoSQL</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-document"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/orientdb.png" alt="OrientDB" />
    <h3>OrientDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#orientdb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-orientdb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/ravendb.png" alt="RavenDB" />
    <h3>RavenDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#ravendb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-ravendb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/solr.svg" alt="Apache Solr" />
    <h3>Apache Solr</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#solr"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-solr/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

</div>

## Time Series

Time-series databases organize observations around timestamps and are optimized for ingestion, retention, monitoring, IoT, metrics, and analysis of data over time.

<div class="database-grid">

  <div class="database-card">
    <img src="/img/logos/influxdb.png" alt="InfluxDB" />
    <h3>InfluxDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#influxdb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-influxdb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/apache-io-tbd.png" alt="Apache IoTDB" />
    <h3>Apache IoTDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#apache-iotdb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-iotdb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/questdb.png" alt="QuestDB" />
    <h3>QuestDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#questdb"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-questdb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

</div>

## Graph

Graph databases represent entities as vertices and relationships as edges, enabling traversal and relationship-oriented queries.

Eclipse JNoSQL provides graph support through Apache TinkerPop integration and dedicated database integrations.

<div class="database-grid">

  <div class="database-card">
    <img src="/img/logos/apache-tinkerpop.png" alt="Apache TinkerPop" />
    <h3>Apache TinkerPop</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#tinkerpop-integration"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-tinkerpop/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/ArangoDB.png" alt="ArangoDB" />
    <h3>ArangoDB</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-graph"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

  <div class="database-card">
    <img src="/img/logos/neo4j.png" alt="Neo4J" />
    <h3>Neo4J</h3>
    <div class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#neo4j"
         target="_blank"
         rel="noopener noreferrer">Documentation</a>
      ·
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-neo4j/{{ site.jnosql_databases_version }}/"
         target="_blank"
         rel="noopener noreferrer">Javadoc</a>
    </div>
  </div>

</div>

## Vector

**Coming soon.**

Vector database support is planned for a future Eclipse JNoSQL release.

## Looking for implementation details?

Each database driver has its own installation instructions, configuration properties, examples, Template API, repository support, and database-specific capabilities.

<a href="https://github.com/eclipse-jnosql/jnosql-databases"
target="_blank"
rel="noopener noreferrer">
Explore the Eclipse JNoSQL database drivers →
</a>