const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const Customer = require("../model/Customer");

router.post("/signup", (req, res) => {
   Customer.findOne({ email: req.body.email }).then(customer => {
      if (customer) {
         return res.status(400).json({ email: "Email already exists" });
      } else {
         const newCustomer = new Customer(req.body);
         // hashing password before storing it in database
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newCustomer.password, salt, (err, hash) => {
               newCustomer.password = hash;
               newCustomer
                  .save()
                  .then(doc => res.json(doc))
                  .catch(err =>
                     console.log({ err })
                  );
            });
         });
      }
   });
});

router.post("/login", (req, res) => {
    Customer.findOne({ email: req.body.email }).then(customer => {
       if (!customer) {
          return res.status(404).json({ email: "Customer not found" });
       }
 
       bcrypt.compare(req.body.password, customer.password).then(isMatch => {
          if (isMatch) {
             const payload = {
                customerId: customer._id
             };
             jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                   console.log(err);
                }
                return res.json({
                   success: true,
                   token: "Bearer " + token
                });
             });
          } else {
             return res.status(400).json({ password: "Password Incorrect" });
          }
       });
    });
 });

router.patch("/update/:id",
 (req, res) => {
    Customer.findOneAndUpdate(
       { _id: req.params.id },
       { $set: req.body },
       { new: true }
    )
       .then(doc => res.status(200).json(doc))
       .catch(err =>
          res.status(400).json({ update: "Error updating existing user" })
       );
 }
);


router.get("/", (req, res) => {
   Customer.find()
      .sort({updatedAt: -1})
      .populate('addresses')
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);

router.get("/:id", async (req, res) => {
   await Customer.findOne({ _id: req.params.id })
       .populate('addresses')
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

module.exports = router;
