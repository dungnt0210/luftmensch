const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/create", (req, res) => {
      const newOrder = new Order(req.body);
      newOrder
         .save()
         .then(doc => res.json(doc))
         .catch(err => res.json(err));
   }
);

router.get("/", (req, res) => {
      Order.find()
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);

router.get("/:id", (req, res) => {
   Order.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      Order.findOneAndUpdate(
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
      Order.findOneAndDelete({ _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;
