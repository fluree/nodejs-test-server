const express = require("express");
const flureenjs = require('@fluree/flureenjs');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { address, transaction} = body;
    console.dir({address, transaction})
    // const conn = await connect();
    const loadedLedger = await flureenjs.jldLoad(address);
    console.dir(loadedLedger);
    const stage = await flureenjs.jldStage(loadedLedger, transaction);
    console.dir(stage);
    res.status(200).json("🙌")
  } catch (err) {
    console.error(err);
    res.status(500).json(`😬`);
  }
});

module.exports = router;
