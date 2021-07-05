const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const Customer = require("../model/Customer");

router.get("/my-profile",
passport.authenticate('customer-permission', { session: false }),
(req, res) => {
   Customer.findOne({ _id: req.user._id })
   .populate('addresses')
   .then(doc => res.json(doc))
   .catch(err => res.json(err));
   }
);

router.post("/signup", (req, res) => {
   Customer.findOne({ email: req.body.email }).then(customer => {
      if (customer) {
         return res.status(400).json({ error: "Email already exists" });
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
                     console.log({ error: err })
                  );
            });
         });
      }
   });
});

router.patch("/add-to-cart",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   let cart = [];
   await Customer.findOne({ _id: req.user._id })
      .then(doc => cart = doc.cart);
   let key = cart.findIndex(item => 
      item.productId == req.body.productId._id && 
      item.options.size == req.body.options.size && 
      item.options.color == req.body.options.color );
   if (key === -1) {
      Customer.findOneAndUpdate(
         { _id: req.user._id },
         { $push: {cart: req.body } },
         { new: true }
         )
      .populate('cart.productId', 'name price images')
      .then(doc => res.json(doc.cart));
   } else {
         cart[key].options.qty = cart[key].options.qty + parseInt(req.body.options.qty);
         Customer.findOneAndUpdate(
            { _id: req.user._id },
            { $set: {cart: cart } },
            { new: true }
            )
         .populate('cart.productId', 'name price images')
         .then(doc => res.json(doc.cart));
      }
});

router.patch("/add-to-wishlist",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOneAndUpdate(
      { _id: req.user._id },
      { $push: {wishlist: req.body.productId } },
      { new: true }
      )
   .populate('wishlist', 'name price images')
   .then(doc => res.json(doc.wishlist))
   .catch(err => res.status(400).json({error: err}));
   ;
});

router.get("/wishlist",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOne(
      { _id: req.user._id }
      )
   .populate('wishlist', 'name price images')
   .then(doc => res.json(doc.wishlist))
   .catch(err => res.status(400).json({error: err}));
   ;
});

router.get("/cart",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOne(
      { _id: req.user._id }
      )
   .populate('cart.productId', 'name price images')
   .then(doc => res.json(doc.cart))
   .catch(err => res.status(400).json({error: err}));
   ;
});

router.patch("/remove-from-wishlist",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: {wishlist: req.body.productId } },
      { new: true }
      )
   .populate('wishlist', 'name price images')
   .then(doc => res.json(doc.wishlist))
   .catch(err => res.status(400).json({error: err}));
   ;
});

router.patch("/remove-from-cart",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: {cart: {_id: req.body.itemId}  } },
      { new: true }
      )
   .populate('cart.productId', 'name price images')
   .then(doc => res.json(doc.cart))
   .catch(err => res.status(400).json({error: err}));
   ;
});

router.patch("/update-cart",
passport.authenticate('customer-permission', { session: false }),
async (req, res) => {
   Customer.findOneAndUpdate(
      { _id: req.user._id,
         cart: { $elemMatch: { _id: req.body.itemId}}
      },
      { $set: { 'cart.$.options.qty' : req.body.qty } },
      { new: true }
      )
   .populate('cart.productId', 'name price images')
   .then(doc => res.json(doc.cart))
   .catch(err => res.status(400).json({error: err}));
   ;
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

router.patch("/update-profile",
passport.authenticate('customer-permission', { session: false }),
 (req, res) => {
   Customer.findOne({ _id: req.user._id }).then(customer => {
      if (!customer) {
         return res.status(404).json({ message: "Customer not found" });
      }
      
      if (req.body.changeEmail) {
         bcrypt.compare(req.body.password, customer.password).then(isMatch => {
            if (isMatch) {
                  customer.email = req.body.email;
                  customer.name = req.body.name;
                  customer.save()
                  .then(doc => res.json({
                     message: "Your profile is saved",
                     customer: doc
                  }));
            } else {
               res.status(400).json({ message: "Password Incorrect" });
            }
            }
         );
      } else {
         customer.name = req.body.name;
         customer.save()
         .then(doc => res.json({
            message: "Your profile is saved",
            customer: doc
         }));
      }
   });
 }
);


router.patch("/change-password",
passport.authenticate('customer-permission', { session: false }),
 (req, res) => {
   Customer.findOne({ _id: req.user._id }).then(customer => {
      if (!customer) {
         return res.status(404).json({ message: "Customer not found" });
      }

      bcrypt.compare(req.body.password, customer.password).then(isMatch => {
         if (isMatch) {
            customer.password = req.body.newPassword;
            customer.email = req.body.email;
            customer.name = req.body.name;
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(customer.password, salt, (err, hash) => {
                  customer.password = hash;
                  customer
                     .save()
                     .then(doc => res.json({
                        message: "Your profile is saved",
                        customer: doc
                     }))
                     .catch(err =>
                        console.log({ error: err })
                     );
               });
            });
         } else {
            return res.status(400).json({ message: "Password Incorrect" });
         }
      });
   });
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
