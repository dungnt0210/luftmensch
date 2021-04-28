const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const Adminer = require("../model/Adminer");

router.post("/create", (req, res) => {
    const newAdminer = new Adminer(req.body);
    // hashing password before storing it in database
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdminer.password, salt, (err, hash) => {
        newAdminer.password = hash;
        newAdminer
            .save()
            .then(doc => res.json(doc))
            .catch(err =>
                res.status(400).json(err)
            );
    });
    });
});

router.post("/login", (req, res) => {
   console.log(req.body);
    Adminer.findOne({ username: req.body.username }).then(adminer => {
       if (!adminer) {
          return res.status(404).json({ message: "Adminer not found" });
       }
 
       bcrypt.compare(req.body.password, adminer.password).then(isMatch => {
          if (isMatch) {
             const payload = {
                id: adminer._id
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
             return res.status(400).json({ password: "Password incorrect!" });
          }
       });
    });
 });

module.exports = router;
