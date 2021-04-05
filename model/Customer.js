const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Customer = {
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   gender: {
      type: String,
      required: true
   },
   postCode: {
    type: String,
    required: true
  },
   address: {
      type: String,
      required: true
   },
   birthday: {
      type: Date
   },
   orders: [{type: ObjectId, ref: 'Order' }],
};

const CustomerSchema = new Schema(Customer, {timestamps: true});
module.exports = mongoose.model("Customer", CustomerSchema);
