const express = require("express");
const { newLedger, transact } = require("./routers");

const app = express();
app.use(express.json());
app.use("/new", newLedger);
app.use("/transact", transact);

const port = 2525;

app.listen(port, () => console.log(`listening at port ${port}`));
