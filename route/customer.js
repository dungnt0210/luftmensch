const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const Customer = require("../model/Customer");

router.post("/signup", (req, res) => {
   Customer.findOne({ name: req.body.email }).then(customer => {
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
                id: customer._id
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

module.exports = router;
