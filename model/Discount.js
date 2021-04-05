const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Discount = {
   discountType: {
      type: String,
      required: true
   },
   percent: {
      type: Number
   },
   money: {
       type: Number
   }
};

const DiscountSchema = new Schema(Discount);
module.exports = mongoose.model("Discount", DiscountSchema);