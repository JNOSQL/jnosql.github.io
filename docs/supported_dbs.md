---
layout: default
title: Supported Databases
sort: 2
---

# Supported Databases

Eclipse JNoSQL provides a common programming model for multiple NoSQL database technologies while preserving database-specific capabilities when needed.

The integrations are grouped by data model. Multi-model databases appear in every category they support.

For installation, configuration, examples, and database-specific features, see the
<a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc" target="_blank" rel="noopener noreferrer">Eclipse JNoSQL Databases documentation</a>.

## Key-Value

Key-value databases organize data as values addressed by unique keys. This model is well suited to direct lookups, caching, session data, and similar access patterns.

<div class="database-grid">
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/ArangoDB.png' | relative_url }}" alt="ArangoDB logo" loading="lazy"></div>
    <h3>ArangoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-key-value" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/couchbase.svg' | relative_url }}" alt="Couchbase logo" loading="lazy"></div>
    <h3>Couchbase</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-key-value" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/dynamodb.svg' | relative_url }}" alt="DynamoDB logo" loading="lazy"></div>
    <h3>DynamoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-key-value" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/hazelcast.svg' | relative_url }}" alt="Hazelcast logo" loading="lazy"></div>
    <h3>Hazelcast</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hazelcast" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hazelcast/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/infinispan.svg' | relative_url }}" alt="Infinispan logo" loading="lazy"></div>
    <h3>Infinispan</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#infinispan" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-infinispan/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/memcached.png' | relative_url }}" alt="Memcached logo" loading="lazy"></div>
    <h3>Memcached</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#memcached" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-memcached/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/oracle.png' | relative_url }}" alt="Oracle NoSQL logo" loading="lazy"></div>
    <h3>Oracle NoSQL</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-key-value" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/redis.png' | relative_url }}" alt="Redis logo" loading="lazy"></div>
    <h3>Redis</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#redis" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-redis/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/riak.png' | relative_url }}" alt="Riak logo" loading="lazy"></div>
    <h3>Riak</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#riak" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-riak/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/valkey.png' | relative_url }}" alt="Valkey logo" loading="lazy"></div>
    <h3>Valkey</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#valkey" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-valkey/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
</div>

## Column

Column databases organize related values into rows and columns and are designed for distributed, scalable access to large datasets.

<div class="database-grid">
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/cassandra.png' | relative_url }}" alt="Apache Cassandra logo" loading="lazy"></div>
    <h3>Apache Cassandra</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#cassandra" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-cassandra/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/hbase.png' | relative_url }}" alt="Apache HBase logo" loading="lazy"></div>
    <h3>Apache HBase</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hbase" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hbase/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
</div>

## Document

Document databases store data as self-contained documents, providing flexible structures and queries over document fields.

<div class="database-grid">
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/ArangoDB.png' | relative_url }}" alt="ArangoDB logo" loading="lazy"></div>
    <h3>ArangoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/couchbase.svg' | relative_url }}" alt="Couchbase logo" loading="lazy"></div>
    <h3>Couchbase</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-document" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/couchdb.png' | relative_url }}" alt="Apache CouchDB logo" loading="lazy"></div>
    <h3>Apache CouchDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchdb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchdb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/dynamodb.svg' | relative_url }}" alt="DynamoDB logo" loading="lazy"></div>
    <h3>DynamoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/elastic.svg' | relative_url }}" alt="Elasticsearch logo" loading="lazy"></div>
    <h3>Elasticsearch</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#elasticsearch" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-elasticsearch/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/mongodb.png' | relative_url }}" alt="MongoDB logo" loading="lazy"></div>
    <h3>MongoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#mongodb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-mongodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/oracle.png' | relative_url }}" alt="Oracle NoSQL logo" loading="lazy"></div>
    <h3>Oracle NoSQL</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-document" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/orientdb.png' | relative_url }}" alt="OrientDB logo" loading="lazy"></div>
    <h3>OrientDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#orientdb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-orientdb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/ravendb.png' | relative_url }}" alt="RavenDB logo" loading="lazy"></div>
    <h3>RavenDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#ravendb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-ravendb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/solr.svg' | relative_url }}" alt="Apache Solr logo" loading="lazy"></div>
    <h3>Apache Solr</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#solr" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-solr/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
</div>

## Time Series

Time-series databases organize observations around timestamps and are optimized for ingestion, monitoring, IoT, metrics, and analysis over time.

<div class="database-grid">
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/influxdb.png' | relative_url }}" alt="InfluxDB logo" loading="lazy"></div>
    <h3>InfluxDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#influxdb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-influxdb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/apache-io-tbd.png' | relative_url }}" alt="Apache IoTDB logo" loading="lazy"></div>
    <h3>Apache IoTDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#apache-iotdb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-iotdb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/questdb.png' | relative_url }}" alt="QuestDB logo" loading="lazy"></div>
    <h3>QuestDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#questdb" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-questdb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
</div>

## Graph

Graph databases represent entities as vertices and relationships as edges, enabling traversal and relationship-oriented queries.

<div class="database-grid">
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/apache-tinkerpop.png' | relative_url }}" alt="Apache TinkerPop logo" loading="lazy"></div>
    <h3>Apache TinkerPop</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#tinkerpop-integration" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-tinkerpop/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/ArangoDB.png' | relative_url }}" alt="ArangoDB logo" loading="lazy"></div>
    <h3>ArangoDB</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-graph" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
  <article class="database-card">
    <div class="database-logo"><img src="{{ '/img/logos/neo4j.png' | relative_url }}" alt="Neo4j logo" loading="lazy"></div>
    <h3>Neo4j</h3>
    <p class="database-links">
      <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#neo4j" target="_blank" rel="noopener noreferrer">Documentation</a>
      <span aria-hidden="true">·</span>
      <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-neo4j/{{ site.jnosql_databases_version }}/" target="_blank" rel="noopener noreferrer">Javadoc</a>
    </p>
  </article>
</div>

## Vector — Coming soon

Vector database support is planned for a future Eclipse JNoSQL release.

## Looking for implementation details?

Each database driver has installation instructions, configuration properties, examples, Template API guidance, repository support, and database-specific capabilities.

<a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc" target="_blank" rel="noopener noreferrer">Explore the Eclipse JNoSQL database drivers →</a>
