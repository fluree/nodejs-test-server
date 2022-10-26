const express = require('express');
const flureenjs = require('@fluree/flureenjs');

const app = express();
app.use(express.json());

const port = 2525;

var njsConnections = [];

const resultReducer = (array) =>
  array.reduce((prev, curr, i) => {
    if (i % 2 === 0) {
      let value = array[i + 1];
      if (value?.arr) {
        value = resultReducer(value.arr);
      }
      prev[curr?.name || curr] = value;
    }
    return prev;
  }, {});

const flureeConnect = () =>
  flureenjs
    .jldConnect({
      method: 'memory',
      defaults: {
        indexer: { 'reindex-min-bytes': 9000, 'reindex-max-bytes': 10000000 },
        context: {
          id: '@id',
          type: '@type',
          schema: 'http://schema.org/',
          rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
          wiki: 'https://www.wikidata.org/wiki/',
          skos: 'http://www.w3.org/2008/05/skos#',
          f: 'https://ns.flur.ee/ledger#',
        },
      },
    })
    .then((conn) => {
      return conn;
    });

flureeConnect().then((conn) => {
  const ledgers = {};

  app.post('/new', async (req, res) => {
    try {
      const ledgerName = req.body['ledger/id'];
      const newLedger = await flureenjs.jldCreate(conn, ledgerName);
      ledgers[newLedger.address] = newLedger;
      console.dir(newLedger);
      res.status(201).json(newLedger.address);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });

  app.post('/stage/:network/:ledger', async (req, res) => {
    try {
      const { network, ledger } = req.params;
      const { body } = req;
      const address = `fluree:memory://${network}/${ledger}/main/HEAD`;
      const loadedLedger = ledgers[address];
      // flureenjs.jldLoad() appears to be broken with memory connection
      //   const loadedLedger = await flureenjs.jldLoad(conn, address);
      if (!loadedLedger) throw new Error('no leger with that name');
      console.dir(loadedLedger);
      const stage = await flureenjs.jldStage(loadedLedger, body);
      console.dir(stage);
      const result = await flureenjs.jldCommit(stage);
      const resultArray = result?.commit?.arr;
      const reducedResult = resultReducer(resultArray);
      ledgers[address] = loadedLedger;
      res.status(200).json(reducedResult);
    } catch (error) {
      debugger;
      console.error(error);
      res.status(500).end();
    }
  });

  app.post('/query/:network/:ledger', async (req, res) => {
    try {
      const { network, ledger } = req.params;
      const { body } = req;
      const address = `fluree:memory://${network}/${ledger}/main/HEAD`;
      const loadedLedger = ledgers[address];
      if (!loadedLedger) throw new Error('no leger with that name');
      let results = await flureenjs.jldQuery(
        await flureenjs.jldDb(loadedLedger),
        body
      );
      console.dir({ results });
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message || error);
    }
  });

  const listener = app.listen(port, () =>
    console.log(`listening at port ${port}`)
  );
  listener.on('connection', (connection) => {
    njsConnections.push(connection);
    connection.on(
      'close',
      () =>
        (njsConnections = njsConnections.filter((curr) => curr !== connection))
    );
  });
});
