const express = require("express");
const { newLedger, stage } = require("./routers");

const app = express();
app.use(express.json());
app.use("/new", newLedger);
app.use("/stage", stage);

const port = 2525;

app.listen(port, () => console.log(`listening at port ${port}`));
