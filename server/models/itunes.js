const mongoose = require("mongoose");

const itunesSchema = new mongoose.Schema({}, { strict: false });

const Itune = mongoose.model("Itune", itunesSchema);

exports.Itune = Itune;
