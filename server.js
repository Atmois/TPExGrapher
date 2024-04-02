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
  const filePath = path.join(__dirname, `./ItemValues/${itemID}.csv`);

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
