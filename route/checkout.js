const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const Review = require("../model/Review");
const Customer = require("../model/Customer");

const Payment = require("../model/Payment");
const Shipping = require("../model/Shipping");

const checkoutController = require("../controller/checkoutController");
const passport = require("passport");
const fs = require("fs");
router.post("/guest", async (req, res) => {
   let validate = await checkoutController.validateQty(req.body.products);
   if (validate) {
      await checkoutController.guestExecute(req.body.products);
      const newOrder = new Order(req.body);
      newOrder
      .save()
      .then(doc => {
         res.status(200).json({error: false, contact: doc.contact, _id: doc._id});
      })
      .catch(err => res.json(err));
   } else {
      res.status(400).json({error: true, 
         message: "One of your products in your cart was changed. Please check and update your cart"});
   }
}
);

router.post("/",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   let validate = await checkoutController.validateQty(req.body.products);
   if (validate) {
      checkoutController.customerExecute(req.user._id, req.body)
      .then(() => res.status(200).json({error: false, contact: req.body.contact}))
   } else {
      res.status(400).json({error: true, 
         message: "One of your products in your cart was changed. Please check and update your cart"});
   }
}
);

router.post("/update-review", (req, res) => {
   Customer.updateMany({}, {reviews: []})
   .then(docs => res.send("Ok"))
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
module.exports = router;
