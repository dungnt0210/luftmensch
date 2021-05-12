const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = {
   detail: {
      type: String
   },
   commune: {
      type: String
   },
   district: {
    type: String
    },
    province: {
        type: String
    },
   postCode: {
    type: String
  }
};

const AddressSchema = new Schema(Address, {timestamps: true});
module.exports = mongoose.model("Address", AddressSchema);
