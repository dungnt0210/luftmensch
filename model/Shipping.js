const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Shipping = {
   value: {
      type: String,
      required: true
   },
   label: {
      type: String,
      required: true
   },
   fee: {
      type: Number,
      required: true
   }
};

const ShippingSchema = new Schema(Shipping, {timestamps: true});

module.exports = mongoose.model("Shipping", ShippingSchema);
