const express = require("express");
const router = express.Router();
const Review = require("../model/Review");
const multer = require("multer");
const fs = require("fs");
const { deprecate } = require("util");
var tempDir = 'client/public/review/temp';
var tempDirName = tempDir + '/';
router.post("/create", (req, res) => {
      const newReview = new Review(req.body);
      newReview
         .save()
         .then(doc => res.json(doc))
         .catch(err => res.json(err));
   }
);

var fileType = '.png';

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, tempDir)
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + fileType)
   }
 });
 var upload = multer({
   storage: storage
 }).fields([
   {name: "image", maxCount: 4},
]);


 router.post('/update/:reviewId', 
 (req, res) => {
   upload(req, res, err => {
      if (err) {
        res.status(400).json({
          result: "failed",
          message: `Cannot upload files. Error is ${err}`
        });
      } else {
         let reviewPath = 'client/public/review/' + req.params.reviewId + '/';
         let imagesPath = [];
         if( req.files["image"]) {
            req.files["image"].forEach(img => {
               fs.rename(tempDirName + img.filename, reviewPath + img.filename, err => res.status(400));
               imagesPath.push("/review/" + req.params.reviewId + '/' + img.filename);
            })
         }
         Review.findOne({_id: req.params.reviewId})
            .then(async doc => {
               doc.content = req.body.content;
               doc.rate= req.body.rate;
               doc.reviewed = true;
               let nxImages = doc.images;
               if (req.body.removeLs) {
                   nxImages = await nxImages.filter(nxItem => !req.body.removeLs.includes(nxItem))
               }
               doc.images = await nxImages.concat(imagesPath);
               doc.save().then(result =>res.status(200).json(result));
               })
            .catch(err =>
               // res.status(400).json({ update: "Error updating existing post" })
               console.log(err)
            );
        }
    });
}
 )

router.get("/", (req, res) => {
      Review.find()
         .populate("customer product", "name")
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);

router.get("/product/:productId", (req, res) => {
   Review.find({product: req.params.productId}).populate("customer", "name")
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);

router.get("/:id", (req, res) => {
   Review.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      Review.findOneAndUpdate(
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
      Review.findOneAndDelete({ _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;
