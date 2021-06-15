const express = require("express");
const router = express.Router();
const Address = require("../model/Address");
const Customer = require("../model/Customer");
const AddressData = require("../model/AddressData");
const passport = require("passport");

router.get("/provinces", (req, res) => {
   AddressData.find({}, {level1_id: 1, name: 1})
   .then(docs => res.status(200).json(docs.map(item => item = {value: item.level1_id, label: item.name})))
   .catch(err => res.status(404).jsonjson(err));
}
);

router.get("/:provinceCode/districts", (req, res) => {
   AddressData.findOne({level1_id: req.params.provinceCode})
   .then(doc => res.status(200).json(doc.level2s.map(item => item = {value: item.level2_id, label: item.name})))
   .catch(err => res.status(404).jsonjson(err));
}
);

router.get("/:provinceCode/:districtCode/communes", (req, res) => {
   AddressData.findOne({level1_id: req.params.provinceCode}, {level2s: 1})
   .then(doc => {
      let districtIndex = doc.level2s.findIndex(item => item.level2_id == req.params.districtCode);
      return  res.status(200).json(doc.level2s[districtIndex].level3s.map(cmitem => cmitem = {value: cmitem.level3_id, label: cmitem.name}));
   })
   .catch(err => res.status(404).json(err));
}
);

router.post("/create",
passport.authenticate('customer-permission', { session: false }),
(req, res) => {
      const newAddress = new Address(req.body);
      newAddress
         .save()
         .then(async function(doc) {
            await Customer.findOneAndUpdate(
                { _id: req.user._id },
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
