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
   fee: {
      type: Number,
      required: true
   }
};

const PaymentSchema = new Schema(Payment, {timestamps: true});

module.exports = mongoose.model("Payment", PaymentSchema);
