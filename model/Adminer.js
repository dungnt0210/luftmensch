const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Adminer = {
   username: {
      type: String,
      required: true,
      unique : true
   },
   fullname: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique : true
  },
   role: {
      type: String,
      default: "admin"
   },
   password: {
      type: String,
      required: true
   }
};

const AdminerSchema = new Schema(Adminer, {timestamps: true});
module.exports = mongoose.model("Adminer", AdminerSchema);
