const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const Blog = {
   title: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   author: {
      type: ObjectId,
      ref: 'User'
   },
   previewImg: {
      type: String
   }
};

const BlogSchema = new Schema(Blog, {timestamps: true});

module.exports = mongoose.model("Blog", BlogSchema);
