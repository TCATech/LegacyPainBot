const mongoose = require("mongoose");

module.exports = mongoose.model(
  "warns",
  new mongoose.Schema({
    Warns: Array,
    User: String,
    Guild: String,
  })
);
