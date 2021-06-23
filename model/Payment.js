const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Payment = {
   value: {
      type: String,
      required: true
   },
   label: {
      type: String,
      required: true
   },
   logo: {
      type: String,
   },
};

const PaymentSchema = new Schema(Payment, {timestamps: true});

module.exports = mongoose.model("Payment", PaymentSchema);
