const { Schema, model } = require("mongoose");

module.exports = model(
  "music-annouce",
  new Schema({
    Guild: String,
    Toggle: Boolean,
  })
);
