const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({}, { strict: false });

const Tweet = mongoose.model("Tweet", tweetSchema);

exports.Tweet = Tweet;
