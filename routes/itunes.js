const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const { Itune } = require("../models/itunes");

// Get Reviews
router.get("/", async (req, res) => {
  let collection = await Itune.find({ $and: [req.query] });

  const meta = {
    total: collection.length
  };
  const data = {
    data: collection,
    meta: meta
  };

  res.send(data);
});

//Get Next Review

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Itune.find({ _id: { $gt: new mongodb.ObjectID(id) } })
    .limit(1)
    .toArray();
  res.send(data);
});

//Update Post
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;
  let data = await Itune.findOneAndUpdate(
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
  res.send(data);
});
module.exports = router;
