const express = require("express");
const flureenjs = require("@fluree/flureenjs");
const { connect, memoryConnOptions } = require("../lib/connect");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const ledgerName = req.body["ledger/id"];
    const conn = await connect(memoryConnOptions);
    const newLedger = await flureenjs.jldCreate(conn, ledgerName);
    console.dir(newLedger);
    res.status(201).json(newLedger.address);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
