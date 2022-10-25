const flureenjs = require("@fluree/flureenjs");

const ipfsConnOptions = {
  server: null,
  method: "ipfs",
  defaults: {
    ipns: { key: "self" },
    indexer: { "reindex-min-bytes": 9000, "reindex-max-bytes": 10000000 },
    context: {
      id: "@id",
      type: "@type",
      schema: "http://schema.org/",
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      wiki: "https://www.wikidata.org/wiki/",
      skos: "http://www.w3.org/2008/05/skos#",
      f: "https://ns.flur.ee/ledger#",
    },
    //  :did     (did/private->did-map "8ce4eca704d653dec594703c81a84c403c39f262e54ed014ed857438933a2e1c")
  },
};

const fileConnOptions = {
  method: "file",
  "storage-path": "/connTest/",
  "publish-path": "/connTest/data/",
  context: {
    id: "@id",
    type: "@type",
    schema: "http://schema.org/",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    wiki: "https://www.wikidata.org/wiki/",
    skos: "http://www.w3.org/2008/05/skos#",
    f: "https://ns.flur.ee/ledger#",
  },
};

const memoryConnOptions = {
  method: "memory",
  context: {
    id: "@id",
    type: "@type",
    schema: "http://schema.org/",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    wiki: "https://www.wikidata.org/wiki/",
    skos: "http://www.w3.org/2008/05/skos#",
    f: "https://ns.flur.ee/ledger#",
  },
};

let cached = global.flureeConn;

if (!cached) {
  cached = global.flureeConn = { conn: null, promise: null };
}

const connect = async (connOptions) => {
  if (cached.conn) {
    console.debug("reusing connection", cached.conn.id);
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = flureenjs
      .jldConnect({ ...connOptions, keepAlive: true })
      .then((conn) => {
        console.debug("conn -- connection", conn.id);
        return conn;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = { connect, ipfsConnOptions, fileConnOptions, memoryConnOptions };
