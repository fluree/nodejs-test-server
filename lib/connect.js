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

const connect = async (connOptions) => {
  const conn = await flureenjs.jldConnect(connOptions);
  return conn;
};

module.exports = { connect, ipfsConnOptions, fileConnOptions };
