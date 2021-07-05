const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Customer = {
   name: {
      type: String
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: String
   },
   addresses: [{type: ObjectId, ref: 'Address' }],
   birthday: {
      type: Date
   },
   cart: [{ productId: {type: ObjectId, ref: 'Product' }, options: { qty: Number, size: String, color: String, maxQty: Number, sizeIndex: Number, colorIndex: Number, price: Number  }}],
   wishlist: [{type: ObjectId, ref: 'Product' }],
   reviews: [{type: ObjectId, ref: 'Review' }],
   orders: [{type: ObjectId, ref: 'Order' }],
};

const CustomerSchema = new Schema(Customer, {timestamps: true});
module.exports = mongoose.model("Customer", CustomerSchema);
