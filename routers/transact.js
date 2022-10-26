const express = require("express");
const flureenjs = require("@fluree/flureenjs");
const { connect } = require("../lib/connect");
const connMethod = require("../config");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { address, transaction } = body;
    const conn = await connect(connMethod);
    console.debug("CONN", conn);
    const loadedLedger = await flureenjs.jldLoad(conn, address);
    console.debug("LEDGER", loadedLedger);
    const db = await flureenjs.jldDb(loadedLedger);
    console.debug("DB", db);
    // console.dir(loadedLedger);
    const stage = await flureenjs.jldStage(db, transaction);
    const commit = await flureenjs.jldcommit(stage);
    console.dir(commit);
    res.status(200).json("🙌");
  } catch (err) {
    console.debug("ERR", err);
    res.status(500).json(`😬`);
  }
});

module.exports = router;
