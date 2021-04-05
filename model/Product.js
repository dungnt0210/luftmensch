const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const Product = {
   name: {
      type: String,
      required: true
   },
   price: {
     type: Number,
     required: true
   },
   finalPrice: {
    type: Number
   },
   active: {
    type: Boolean,
    default: true
   },
   inStock: {
    type: Boolean,
    default: true
   }, 
   promo: {
    type: Boolean,
    default: false
   },
   qty: {
    type: Number,
    required: true
   },
   description: {
      type: String
   },
   images: [String],
   user: {
      type: ObjectId,
      ref: 'User'
   },
   color: {
      type: String
   },
   size: [{name: String, nums: Number}],
   collar: {
    type: String
   },
   vignette: {
    type: Boolean,
    default: false
   },
   brand: {
    type: String
   },
   material: {
      type: Array,
      default: []
   },
   style: {
    type: String
   },
   discount: [{type: ObjectId, ref: 'Discount' }],
   categories: [{
      type: ObjectId,
      ref: 'Category'
   }],
   review: [{type: ObjectId, ref: 'Review'}]
};

const ProductSchema = new Schema(Product, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);
