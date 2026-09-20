---
layout: default
title: Supported Databases
sort: 2
---

# Supported Databases

Eclipse JNoSQL provides a common programming model for working with multiple NoSQL database technologies while preserving database-specific capabilities when they are needed.

The supported databases are organized by data model. Some databases support more than one model and therefore appear in multiple categories.

For installation, configuration, examples, and database-specific features, see the
<a href="https://github.com/eclipse-jnosql/jnosql-databases" target="_blank" rel="noopener noreferrer">Eclipse JNoSQL Databases documentation</a>.

---

## Key-Value

Key-value databases organize data as values addressed by unique keys. This model is well suited to direct lookups, caching, session data, and other access patterns where applications retrieve a value by its key.

<table class="supported-dbs-table">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/ArangoDB.png" width="140px" alt="ArangoDB" /><br/>
        <strong>ArangoDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/couchbase.svg" width="140px" alt="Couchbase" /><br/>
        <strong>Couchbase</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://user-images.githubusercontent.com/6509926/70553550-f033b980-1b40-11ea-9192-759b3b1053b3.png" width="140px" alt="Amazon DynamoDB" /><br/>
        <strong>DynamoDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/hazelcast.svg" width="140px" alt="Hazelcast" /><br/>
        <strong>Hazelcast</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hazelcast" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hazelcast" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/infinispan.svg" width="140px" alt="Infinispan" /><br/>
        <strong>Infinispan</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#infinispan" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-infinispan" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/memcached.png" width="140px" alt="Memcached" /><br/>
        <strong>Memcached</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#memcached" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-memcached" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/oracle.png" width="140px" alt="Oracle NoSQL" /><br/>
        <strong>Oracle NoSQL</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/redis.png" width="140px" alt="Redis" /><br/>
        <strong>Redis</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#redis" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-redis" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/basho.png" width="140px" alt="Riak" /><br/>
        <strong>Riak</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#riak" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-riak" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/valkey.png" width="140px" alt="Valkey" /><br/>
        <strong>Valkey</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#valkey" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-valkey" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
  </tbody>
</table>

---

## Column Family

Column-family databases store related values in rows grouped into column families. They are designed for distributed, scalable access to structured or sparsely populated records.

<table class="supported-dbs-table">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/cassandra.png" width="160px" alt="Apache Cassandra" /><br/>
        <strong>Apache Cassandra</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#cassandra" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-cassandra" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/hbase.png" width="160px" alt="Apache HBase" /><br/>
        <strong>Apache HBase</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#hbase" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-hbase" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
  </tbody>
</table>

---

## Document

Document databases store records as self-contained documents whose fields can be queried and evolved without requiring every record to share an identical structure.

<table class="supported-dbs-table">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/ArangoDB.png" width="140px" alt="ArangoDB" /><br/>
        <strong>ArangoDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/couchbase.svg" width="140px" alt="Couchbase" /><br/>
        <strong>Couchbase</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchbase-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchbase" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/couchdb.png" width="140px" alt="Apache CouchDB" /><br/>
        <strong>Apache CouchDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#couchdb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-couchdb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://user-images.githubusercontent.com/6509926/70553550-f033b980-1b40-11ea-9192-759b3b1053b3.png" width="140px" alt="Amazon DynamoDB" /><br/>
        <strong>DynamoDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#dynamodb-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-dynamodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/elastic.svg" width="140px" alt="Elasticsearch" /><br/>
        <strong>Elasticsearch</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#elasticsearch" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-elasticsearch" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/mongodb.png" width="140px" alt="MongoDB" /><br/>
        <strong>MongoDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#mongodb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-mongodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/oracle.png" width="140px" alt="Oracle NoSQL" /><br/>
        <strong>Oracle NoSQL</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#oracle-nosql-document" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-oracle-nosql" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/orientdb.png" width="140px" alt="OrientDB" /><br/>
        <strong>OrientDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#orientdb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-orientdb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/ravendb.png" width="140px" alt="RavenDB" /><br/>
        <strong>RavenDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#ravendb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-ravendb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/solr.svg" width="140px" alt="Apache Solr" /><br/>
        <strong>Apache Solr</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#solr" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-solr" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
  </tbody>
</table>

---

## Time Series

Time-series databases organize observations around timestamps and are optimized for ingestion, retention, and analysis of measurements over time.

The drivers in this section implement the Eclipse JNoSQL Time Series Mapping API, including `TimeSeriesTemplate` and repository integration where provided by that API.

<table class="supported-dbs-table">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/influxdb.png" width="160px" alt="InfluxDB" /><br/>
        <strong>InfluxDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#influxdb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-influxdb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/apache-io-tbd.png" width="160px" alt="Apache IoTDB" /><br/>
        <strong>Apache IoTDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#apache-iotdb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-iotdb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/questdb.png" width="160px" alt="QuestDB" /><br/>
        <strong>QuestDB</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#questdb" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-questdb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
  </tbody>
</table>

---

## Graph

Graph databases represent data as vertices and relationships as edges and are designed for traversal and relationship-oriented queries.

Eclipse JNoSQL provides graph support through Apache TinkerPop integration as well as dedicated database integrations.

<table class="supported-dbs-table">
  <tbody>
    <tr>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/apache-tinkerpop.png" width="160px" alt="Apache TinkerPop" /><br/>
        <strong>Apache TinkerPop</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#tinkerpop-integration" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-tinkerpop" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/ArangoDB.png" width="160px" alt="ArangoDB" /><br/>
        <strong>ArangoDB</strong><br/>
        via Apache TinkerPop<br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#arangodb-graph" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-arangodb" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
      <td align="center">
        <img src="https://www.jnosql.org/img/logos/neo4j.png" width="160px" alt="Neo4J" /><br/>
        <strong>Neo4J</strong><br/>
        <a href="https://github.com/eclipse-jnosql/jnosql-databases/blob/main/README.adoc#neo4j" target="_blank" rel="noopener noreferrer">Documentation</a>
        ·
        <a href="https://javadoc.io/doc/org.eclipse.jnosql.databases/jnosql-neo4j" target="_blank" rel="noopener noreferrer">Javadoc</a>
      </td>
    </tr>
  </tbody>
</table>

---

## Vector

**Coming soon.**

Vector database support is planned for a future Eclipse JNoSQL release.

---

## Looking for implementation details?

Each database driver has its own installation instructions, configuration properties, examples, Template API, repository support, and database-specific capabilities.

<a href="https://github.com/eclipse-jnosql/jnosql-databases" target="_blank" rel="noopener noreferrer">Explore the Eclipse JNoSQL database drivers →</a>
<a href="https://javadoc.io/doc/org.eclipse.jnosql.databases" target="_blank" rel="noopener noreferrer">Browse the API Javadocs →</a>