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
   payment: {
      type: ObjectId,
      ref: 'Payment'
   },
   shipping: {
      method: {
      type: ObjectId,
      ref: 'Shipping'
   },
      fee: {
         type: Number
      }
   },
   contact: {
      email: String,
      name: String,
      telephone: String,
      detail: String,
      commnune: String,      
   },
   status: {
      value: String,
      label: String
   }
};

const OrderSchema = new Schema(Order, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);
