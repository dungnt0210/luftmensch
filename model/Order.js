const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const Order = {
   total: {
      type: Number,
      required: true
   },
   products: [{
      product: {type: ObjectId, ref: 'Product'},
      qty: {type:Number}
      }],
   customer: {
      type: ObjectId,
      ref: 'Customer'
   },
   coupon: {
      type: ObjectId,
      ref: 'Coupon'
 },
};

const OrderSchema = new Schema(Order, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);
