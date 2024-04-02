// This base of this code is AI generated (I know fuckall about JS serverside lmao), so it's very sketchy and not representitive of my programming abilites 
console.log("Server Code Online!")
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/plot-data", (req, res) => {
    console.log("Received POST request for /plot-data");
    const itemID = req.body.itemID;
    console.log("Item ID:", itemID);
    res.json({ message: "Request received" });
});

