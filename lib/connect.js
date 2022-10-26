const flureenjs = require("@fluree/flureenjs");

const did = {
  id: "did:fluree:TfHgFTQQiJMHaK1r1qxVPZ3Ridj9pCozqnh",
  public: "03b160698617e3b4cd621afd96c0591e33824cb9753ab2f1dace567884b4e242b0",
  private: "509553eece84d5a410f1012e8e19e84e938f226aa3ad144e2d12f36df0f51c1e",
};

const ipfsConnOptions = {
  server: null,
  method: "ipfs",
  defaults: {
    ipns: { key: "self" },
    // indexer: { "reindex-min-bytes": 9000, "reindex-max-bytes": 10000000 },
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
    did,
  },
};

const fileConnOptions = {
  method: "file",
  "storage-path": "/diskData/",
  "publish-path": "/diskData/data/",
  defaults: {
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
    did,
  },
};

const memoryConnOptions = {
  method: "memory",
  defaults: {
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
    did,
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

module.exports = {
  connect,
  ipfsConnOptions,
  fileConnOptions,
  memoryConnOptions,
};
