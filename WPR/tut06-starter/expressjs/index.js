"use strict";
const express = require("express");
const app = express();
app.get("/hello", function (req, res) {
  res.type("text");
  res.send("Hello World!");
});
app.use(express.static("public"));
app.listen(8000);
