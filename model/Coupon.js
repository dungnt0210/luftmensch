const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coupon = {
   couponType: {
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

const CouponSchema = new Schema(Coupon);
module.exports = mongoose.model("Coupon", CouponSchema);