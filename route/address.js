const express = require("express");
const router = express.Router();
const Address = require("../model/Address");
const Customer = require("../model/Customer");

router.post("/create", (req, res) => {
      const newAddress = new Address(req.body);
      
      const customerId = req.body.customerId;
      newAddress
         .save()
         .then(async function(doc) {
            await Customer.findOneAndUpdate(
                { _id: customerId },
                { $push: {addresses: doc._id } },
                { new: true }
            )
            .catch(err => res.json(err));
            res.json(doc);
         })
         .catch(err => res.json(err));
   }
);

router.patch("/update/:id", (req, res) => {
      Address.findOneAndUpdate(
         { _id: req.params.id },
         { $set: req.body },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing address" })
         );
   }
);

router.delete("/delete/:id", (req, res) => {
      Address.findOneAndDelete({ _id: req.params.id })
         .then(function(doc) {
            Customer.findOneAndUpdate(
                { _id: customerId },
                { $pull: {addresses: doc._id }},
                { new: true }
            );
             res.status(200).json(doc);
         })
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;
