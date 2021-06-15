const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = {
   telephone: {
      type: String
   },
   detail: {
      type: String
   },
   commune: {
      code: String,
      name: String
   },
   district: {
      code: String,
      name: String
   },
    province: {
      code: String,
      name: String
   },
   isDefault: {
      type: Boolean,
      default: false
   }
};

const AddressSchema = new Schema(Address, {timestamps: true});
module.exports = mongoose.model("Address", AddressSchema);
