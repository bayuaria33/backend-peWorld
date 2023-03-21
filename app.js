const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("Check Dev")
console.log("test")
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });