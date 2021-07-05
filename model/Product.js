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
    type: Number,
    require: true
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
    require: true,
    min: 0
   },
   description: {
      type: String
   },
   images: [String],
   user: {
      type: ObjectId,
      ref: 'User'
   },
   options: [
      { color: { name: String,
          hexCode: String,
          sizes: [ {size: String, count: {type: Number, min: 0 }} ]
      }
    }
   ],
   collar: {
    type: String
   },
   vignette: {
    type: Boolean,
    default: false
   },
   brand: {
      type: ObjectId,
      ref: 'Brand'
   },
   material: [{ name: String, percent: Number}],
   style: {
    type: String
   },
   discount: [{type: ObjectId, ref: 'Discount' }],
   category: {
      type: ObjectId,
      ref: 'Category'
   }
};

const ProductSchema = new Schema(Product, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);
