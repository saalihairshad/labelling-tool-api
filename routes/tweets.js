const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { Tweet } = require("../models/tweet");

// Get Tweets
router.get("/", async (req, res) => {
  let collection = await Tweet.find({ $and: [req.query] }).sort({
    app_name: 1
  });

  const meta = {
    total: collection.length
  };
  const data = {
    data: collection,
    meta: meta
  };

  res.send(data);
});

//Get Next Tweet

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await Tweet.find({
    _id: { $gt: new mongodb.ObjectID(id) }
  }).limit(1);

  res.send(data);
});

//Update Post
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  let tweet = await Tweet.findOneAndUpdate(
    { _id: new mongodb.ObjectID(id) },
    {
      $set: {
        annotations: req.body.annotations,
        finalAnnotation: req.body.finalAnnotation,
        isPending: req.body.isPending
      }
    },
    { new: true }
  );
  res.send(tweet);
});

module.exports = router;
