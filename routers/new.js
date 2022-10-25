const express = require('express');
const flureenjs = require('@fluree/flureenjs');
const { connect, ipfsConnOptions } = require('../lib/connect');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { flureeDbConn, flureeLedger } = req.app.get('config');
    const ledgerName = req.body['ledger/id'];
    // const conn = await connect(ipfsConnOptions);
    debugger;
    const newLedger = await flureenjs.jldCreate(flureeDbConn, ledgerName);
    console.dir(newLedger);
    res.status(201).json(newLedger.address);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
