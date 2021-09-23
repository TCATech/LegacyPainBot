const express = require("express");
const app = express();

module.exports = () => {
  app.get("/", (req, res) => {
    res.send("why are you here, please just leave.");
  });

  app.listen(3000);
};
