const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const Adminer = require("../model/Adminer");

router.get("/",
passport.authenticate('admin-permission', { session: false }),
(req, res) => {
   Adminer.find()
   .sort({ createdAt: -1})
   .then(docs => res.status(200).json(docs))
   .catch(err => res.status(400).json(err));
});

router.delete("/delete/:id",
passport.authenticate('admin-permission', { session: false }),
(req, res) => {
   Adminer.deleteOne({ _id: req.params.id })
   .then(doc => res.status(200).json(doc))
   .catch(err => res.status(400).json(err));
});

router.post("/create",
// passport.authenticate('admin-permission', { session: false }),
(req, res) => {
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
    Adminer.findOne({ username: req.body.username }).then(adminer => {
       if (!adminer) {
          return res.status(404).json({ message: "Adminer not found" });
       }
 
       bcrypt.compare(req.body.password, adminer.password).then(isMatch => {
          if (isMatch) {
             const payload = {
                adminId: adminer._id
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

 router.patch("/update/:adminId",
   passport.authenticate('admin-permission', { session: false }),
   (req, res) => {
      Adminer.findOneAndUpdate(
         { _id: req.params.adminId },
         { $set: req.body },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing user" })
         );
   }
);

module.exports = router;
