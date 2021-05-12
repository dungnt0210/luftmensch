const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brand = {
   name: {
      type: String,
      required: true
   },
   description: {
      type: String
   },
   bannerImage: {
      type: String
   }
};

const BrandSchema = new Schema(Brand);
module.exports = mongoose.model("Brand", BrandSchema);
                                                   