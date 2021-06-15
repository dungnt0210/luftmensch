const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressData = {
   level1_id: {
      type: String
   },
   name: {
      type: String
   },
   type: {
    type: String
    },
    level2s: [
       {
         level2_id: {
            type: String
         },
         name: {
            type: String
         },
         type: {
          type: String
         },
         level3s: [
            {
              level3_id: {
                 type: String
              },
              name: {
                 type: String
              },
              type: {
               type: String
              }
            }
         ]
       }
    ]
};

const AddressDataSchema = new Schema(AddressData, {timestamps: true});
module.exports = mongoose.model("AddressData", AddressDataSchema);
