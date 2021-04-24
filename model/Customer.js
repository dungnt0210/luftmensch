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
   gender: {
      type: String
   },
   postCode: {
    type: String
  },
   address: {
      type: String
   },
   birthday: {
      type: Date
   },
   orders: [{type: ObjectId, ref: 'Order' }],
};

const CustomerSchema = new Schema(Customer, {timestamps: true});
module.exports = mongoose.model("Customer", CustomerSchema);
