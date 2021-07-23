const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Review = {
   rate: {
      type: Number,
   },
   reviewed: {
      type: Boolean,
      default: false
   },
   images: [String],
   replies: [{
    createdAt: { type: Date, default: Date.now },
    content: {type: String},
    admin:{
      type: ObjectId,
      ref: 'Adminer'
   }
   }],
   content: {
      type:  String
   },
   product:{
      type: ObjectId,
      ref: 'Product'
   },
   customer: {
      type: ObjectId,
      ref: 'Customer'
   },
};

const ReviewSchema = new Schema(Review, {timestamps: true});
module.exports = mongoose.model("Review", ReviewSchema);