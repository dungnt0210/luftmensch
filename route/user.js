const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const passport = require("passport");

const User = require("../model/User");

router.post("/signup", (req, res) => {
   User.findOne({ name: req.body.name }).then(user => {
      if (user) {
         return res.status(400).json({ name: "Username already exists" });
      } else {
         const newUser = new User(req.body);
         // hashing password before storing it in database
         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               newUser.password = hash;
               newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err =>
                     console.log({ err })
                  );
            });
         });
      }
   });
});

router.patch("/update",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      User.findOneAndUpdate(
         { _id: req.user._id },
         { $set: req.body },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing user" })
         );
   }
);

router.post("/login", (req, res) => {
   User.findOne({ name: req.body.name }).then(user => {
      if (!user) {
         return res.status(404).json({ name: "User not found" });
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
         if (isMatch) {
            const payload = {
               id: user._id
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
