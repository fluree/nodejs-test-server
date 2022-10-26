const express = require("express");
const flureenjs = require("@fluree/flureenjs");
const { connect, memoryConnOptions, ipfsConnOptions } = require("../lib/connect");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { address, transaction, ledger } = body;
    console.dir({ address, transaction });
    const conn = await connect(ipfsConnOptions);
    const loadedLedger = await flureenjs.jldLoad(conn, address);
    const db = await flureenjs.jldDb(loadedLedger);
    // console.dir(loadedLedger);
    const stage = await flureenjs.jldStage(db, transaction);
    const commit = await flureenjs.jldcommit(stage);
    console.dir(commit);
    res.status(200).json("🙌");
  } catch (err) {
    console.error(err);
    res.status(500).json(`😬`);
  }
});

module.exports = router;
