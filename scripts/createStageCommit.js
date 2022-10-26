const { connect, fileConnOptions } = require("../lib/connect");

const testJson = {
  "@context": "https://schema.org",
  id: "https://www.wikidata.org/wiki/Q836821",
  type: ["Movie"],
  name: "The Hitchhiker's Guide to the Galaxy",
  disambiguatingDescription:
    "2005 British-American comic science fiction film directed by Garth Jennings",
  titleEIDR: "10.5240/B752-5B47-DBBE-E5D4-5A3F-N",
  isBasedOn: {
    id: "https://www.wikidata.org/wiki/Q3107329",
    type: "Book",
    name: "The Hitchhiker's Guide to the Galaxy",
    isbn: "0-330-25864-8",
    author: {
      "@id": "https://www.wikidata.org/wiki/Q42",
      "@type": "Person",
      name: "Douglas Adams",
    },
  },
};

const testJson2 = {
  "@context": "https://schema.org",
  id: "https://www.wikidata.org/wiki/Q836821",
  type: ["CreativeWork"],
};

const testJson3 = {
  id: "https://example.com/customProperty",
  type: ["rdfs:Property"],
};

const testJson4 = {
  "@context": "https://example.com",
  id: "https://www.wikidata.org/wiki/Q836821",
  customProperty: "foobar",
};

const activate = async () => {
  try {
    // console.log(conn);
    const conn = await connect(fileConnOptions);
    const ledgerName = "jld/two";
    const newLedger = await flureenjs.jldCreate(conn, ledgerName);
    // console.log("NEW LEDGER", newLedger);
    const staged = await flureenjs.jldStage(newLedger, testJson);
    const staged2 = await flureenjs.jldStage(staged, testJson2);
    const staged3 = await flureenjs.jldStage(staged2, testJson3);
    const staged4 = await flureenjs.jldStage(staged3, testJson4);
    // console.dir(staged, {depth: 5});
    const db = await flureenjs.jldDb(newLedger);
    const bug = await flureenjs.jldCommit(staged4);
    console.log("whoop", bug);
    const query = {
      from: "https://www.wikidata.org/wiki/Q836821",
      select: ["*"],
    };
    // console.log("DB", db);
    const results = await flureenjs.jldQuery(staged4, query);
    console.log("results", results);
  } catch (err) {
    console.error(err);
  }
};
(async () => {
  await activate();
})();

// const loadAndQuery = async () => {
//   try {
//     const conn = await connect();
//     const ledger = await flureenjs.jldLoad("fluree:local://jld/one");
//     const db = await flureenjs.jldDb(ledger);
//     const query = {
//       select: ["*"],
//       from: "_predicate",
//     };
//     const results = await flureenjs.jldQuery(db, query);
//     console.dir(results);
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAndQuery();
