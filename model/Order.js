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
      options: {
         qty: {type:Number},
         price: {type: Number},
         color: String,
         size: String
         }
      }
   ],
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
      commune: {
         value: String,
         label: String
      },
      district: {
         value: String,
         label: String
      },
      province: {
         value: String,
         label: String
      },  
   },
   status: {
      type: String,
      default: "Pending"
   }
};

const OrderSchema = new Schema(Order, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);
