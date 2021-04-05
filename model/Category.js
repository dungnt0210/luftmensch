const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const Category = {
   name: {
      type: String,
      required: true
   },
   description: {
      type: String
   },
   bannerImage: {
      type: String
   },
   parentCate:  {
      type: ObjectId, 
      ref: 'Category'
   }
};

const CategorySchema = new Schema(Category);
module.exports = mongoose.model("Category", CategorySchema);
                                                   