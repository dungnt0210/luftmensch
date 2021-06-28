const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const multer = require("multer");
const fs = require("fs");

var tempDir = 'client/public/product-img/temp';
var tempDirName = tempDir + '/';
var imgFront = 'img-front';
var imgBehind = 'img-behind';
var imgLeft =  'img-left';
var imgRight = 'img-right';
var fileType = '.png';

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, tempDir)
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileType)
   }
 });
 var upload = multer({
   storage: storage
 }).fields([
   {name: imgFront, maxCount: 1},
   {name: imgBehind, maxCount: 1},
   {name: imgLeft, maxCount: 1},
   {name: imgRight, maxCount: 1}
]);

function caculateQty(data) {
   let qty = 0;
   data.forEach(item => {
      item.color.sizes.forEach(childItem => {
         qty+= parseInt(childItem.count)
      })
   })
   return qty;
}

 router.post("/upload/",
   (req, res) => {
      upload(req, res, err => {
         if (err) {
           res.status(400).json({
             result: "failed",
             message: `Cannot upload files. Error is ${err}`
           });
         } else {
            let productPath = 'client/public/product-img/' + req.query.productId + '/';
            fs.rename(tempDirName + req.files[imgFront][0].filename, productPath + imgFront + fileType, err => res.status(400));
            fs.rename(tempDirName + req.files[imgBehind][0].filename, productPath + imgBehind + fileType, err => res.status(400));
            fs.rename(tempDirName + req.files[imgLeft][0].filename, productPath + imgLeft + fileType, err => res.status(400));
            fs.rename(tempDirName + req.files[imgRight][0].filename, productPath + imgRight + fileType, err => res.status(400));
            res.status(200).json({
               result: 'ok',
               message: "Upload image successfully"
             });
           }
       });
 });
router.post("/create", (req, res) => {
      if (req.body.options) {
         req.body.qty = caculateQty(req.body.options);
      }
      const newProduct = new Product(req.body);
      newProduct
         .save()
         .then(doc => {
            let productDir = 'client/public/product-img/' + doc._id;
            if (!fs.existsSync(productDir)){
               fs.mkdirSync(productDir, err => res.status(400));
           }
            res.json(doc);
         })
         .catch(err => res.json(err));
   }
);
router.post("/updatemany", (req, res) => {
   Product.find({})
      .then(docs => {
         docs.forEach(async doc => {
            doc.images =[];
            await doc.images.push('/product-img/' + doc._id + '/img-front.png');
            await doc.images.push('/product-img/' + doc._id + '/img-behind.png');
            await doc.images.push('/product-img/' + doc._id + '/img-right.png');
            await doc.images.push('/product-img/' + doc._id + '/img-left.png');
            doc.save();
         }).then( () => res.json(200))
      })
      .catch(err => res.status(400).json(err));
}
);
router.get("/", (req, res) => {
      Product.find()
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);

router.get("/category/:cateId", (req, res) => {
   Product
      .find({category: req.params.cateId})
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);

router.get("/:id", async (req, res) => {
   await Product.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      if (req.body.options) {
         req.body.qty = caculateQty(req.body.options);
      }
      Product.findOneAndUpdate(
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
      Product.findOneAndDelete({ _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;