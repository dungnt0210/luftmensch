const express = require("express");
const router = express.Router();
const Review = require("../model/Review");

router.post("/create", (req, res) => {
      const newReview = new Review(req.body);
      newReview
         .save()
         .then(doc => res.json(doc))
         .catch(err => res.json(err));
   }
);

router.get("/", (req, res) => {
      Review.find()
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);

router.get("/:id", (req, res) => {
   Review.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      Review.findOneAndUpdate(
         { _id: req.params.id },
         { $set: req.body },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing post" })
         );
   }
);

router.delete("/delete/:id", (req, res) => {
      Review.findOneAndDelete({ _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;
