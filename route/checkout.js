const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const Payment = require("../model/Payment");
const Shipping = require("../model/Shipping");


router.post("/guest", (req, res) => {
      const newOrder = new Order(req.body);
      newOrder
         .save()
         .then(doc => res.json(doc))
         .catch(err => res.status(400).json({message: "Cannot place order"}));
   }
);

router.get("/shipping", (req, res) => {
      Shipping.find()
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json({message: "Cannot get any shipping methods."}));
   }
);

router.get("/payment", (req, res) => {
    Payment.find()
       .then(docs => res.status(200).json(docs))
       .catch(err => res.status(400).json({message: "Cannot get any payment methods."}));
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
