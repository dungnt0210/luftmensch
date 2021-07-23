const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const multer = require("multer");
const fs = require("fs");
var dir = 'client/public/cate/';
var tempDir = 'client/public/cate/temp';
var tempDirName = 'client/public/cate/temp/';
var fileType= ".png";
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
 }).single("bannerImage");

 router.post("/upload/:cateId",
   (req, res) => {
      upload(req, res, err => {
         if (err) {
           res.status(400).json({
             result: "failed",
             message: `Cannot upload files. Error is ${err}`
           });
         } else {
            if (req.file) 
               fs.rename(tempDirName + req.file.filename, dir + req.params.cateId + fileType, err => res.status(400));
            res.status(200).json({
               result: 'ok',
                message: "Upload image successfully"
             });
           }
       });
 });
router.post("/create", (req, res) => {
      const newCate = new Category(req.body);
      newCate
         .save()
         .then(doc => {
            doc.bannerImage = "/cate/"+doc._id+".png";
            doc.save();
         })
         .catch(err => res.json(err));
   }
);

router.get("/", (req, res) => {
      Category.find({mainCate: true})
         .populate("childCate")
         .then(docs => res.status(200).json(docs))
         .catch(err => res.status(400).json(err));
   }
);
router.get("/all", (req, res) => {
   Category.find({})
      .populate("parentCate")
      .then(docs => res.status(200).json(docs))
      .catch(err => res.status(400).json(err));
}
);

router.get("/:id", (req, res) => {
   Category.findOne({ _id: req.params.id })
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(400).json(err));
});

router.patch("/update/:id", (req, res) => {
      Category.findOneAndUpdate(
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
      Category.findOneAndDelete({ _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;
