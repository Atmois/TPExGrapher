// This base of this code is AI generated & docs code (I know fuckall about JS serverside lmao), so it's very sketchy and not representitive of my programming abilites
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 10000;

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

app.post("/plot-data", (req, res) => {
  const itemID = req.body.itemID;
  console.log("Received POST request for /plot-data for the item", itemID);

  if (!/^[a-z_]+$/.test(itemID)) {
    console.error('Invalid itemID: Only lowercase letters and underscores are allowed');
    return res.status(400).send("Bad Request: Invalid itemID");
  }

  const filePath = path.resolve(__dirname, `./ItemValues/${itemID}.csv`);

  if (!filePath.startsWith(path.resolve(__dirname, './ItemValues'))) {
    console.error("Attempted path traversal outside of ItemValues directory");
    return res.status(403).send("Forbidden: Attempted path traversal outside of ItemValues directory");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }

    const lines = data.split("\n");
    const dates = lines[0].split(",").slice(1);
    const prices = lines[1].split(",").slice(1).map(parseFloat);

    const plotData = dates.map((date, index) => ({ date, value: prices[index] }));

    res.json(plotData);
  });
});
