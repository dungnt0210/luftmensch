const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const Category = require("../model/Category");
const multer = require("multer");
const fs = require("fs");
const productController = require("../controller/productController");
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

 router.post("/upload/:productId",
   (req, res) => {
      upload(req, res, err => {
         if (err) {
           res.status(400).json({
             result: "failed",
             message: `Cannot upload files. Error is ${err}`
           });
         } else {
            let productPath = 'client/public/product-img/' + req.params.productId + '/';
            if (req.files[imgFront]) 
               fs.rename(tempDirName + req.files[imgFront][0].filename, productPath + imgFront + fileType, err => res.status(400));
            if (req.files[imgBehind])
               fs.rename(tempDirName + req.files[imgBehind][0].filename, productPath + imgBehind + fileType, err => res.status(400));
            if (req.files[imgLeft])
               fs.rename(tempDirName + req.files[imgLeft][0].filename, productPath + imgLeft + fileType, err => res.status(400));
            if (req.files[imgRight])
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
         req.body.qty = productController.caculateQty(req.body.options);
      }
      const newProduct = new Product({...req.body, finalPrice: req.body.price});
      newProduct
         .save()
         .then(doc => {
            let productDir = 'client/public/product-img/' + doc._id;
            if (!fs.existsSync(productDir)){
               fs.mkdirSync(productDir, err => res.status(400));
           }
           doc.images = [
               '/product-img/'+  doc._id + "/" + imgFront + fileType,
               '/product-img/'+  doc._id + "/" + imgBehind + fileType,
               '/product-img/'+  doc._id + "/" + imgLeft + fileType,
               '/product-img/'+  doc._id + "/" + imgRight + fileType,
           ];
           doc.save().then(ltRes => res.json(ltRes))
         })
         .catch(err => res.json(err));
   }
);
router.post("/updatemany", async (req, res) => {
   Category.find({})
      .then(docs => {
         docs.forEach(async doc => {
            doc.bannerImage = await'/cate/'+doc._id+'.png';
            doc.save();
         })
      }).then( () => res.json(200))
      .catch(err => res.status(400).json(err));
}
);
router.get("/", (req, res) => {
      Product.find()
      .populate("category", "name")
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);

router.get("/home", (req, res) => {
   Product.find()
   .sort({createdAt: -1})
   .limit(10)
   .populate("category", "name")
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);
router.get("/main-cate/:cateId", async (req, res) => {
   var doc = await Category.findOne({_id: req.params.cateId}).populate("childCate", "_id name");
   var listing = [];
   for(let child of doc.childCate) {
      let newChild = await Product.find({category: child._id})
      .sort({createdAt: -1})
      .limit(5);
      listing.push({cate: child, list: newChild});
   }
   res.status(200).json({...doc._doc, listing: listing});
}
);

router.get("/category/:cateId", (req, res) => {
   Product
      .find({category: req.params.cateId})
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);

router.get("/search", productController.search);

router.get("/:id", async (req, res) => {
   await Product.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      if (req.body.options) {
         req.body.qty = productController.caculateQty(req.body.options);
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