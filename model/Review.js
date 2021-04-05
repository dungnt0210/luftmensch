const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = {
   rate: {
      type: Number,
      required: true
   },
   images: [String],
   comments: [{
    createdAt: { type: Date, default: Date.now },
    content: {type: String, required: true},
    userName: { type: String}
   }]
};

const ReviewSchema = new Schema(Review);
module.exports = mongoose.model("Review", ReviewSchema);