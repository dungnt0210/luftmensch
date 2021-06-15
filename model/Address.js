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
      value: String,
      label: String
   },
   district: {
      value: String,
      label: String
   },
    province: {
      value: String,
      label: String
   },
   isDefault: {
      type: Boolean,
      default: false
   }
};

const AddressSchema = new Schema(Address, {timestamps: true});
module.exports = mongoose.model("Address", AddressSchema);
