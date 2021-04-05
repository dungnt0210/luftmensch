const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = {
   name: {
      type: String,
      required: true
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

const UserSchema = new Schema(User, {timestamps: true});
module.exports = mongoose.model("User", UserSchema);
