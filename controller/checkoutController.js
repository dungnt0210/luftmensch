const Product = require("../model/Product");
const Customer = require("../model/Customer");
const Review = require("../model/Review");
const Address = require("../model/Address");
const Order = require("../model/Order");
const fs = require("fs");

async function validateQty(data) {
   for (const item of data) {
      let productItem =  await Product.findOne({_id : item.product});
      if (productItem._id) {
         if (item.options.qty > productItem.options[item.options.colorIndex].color.sizes[item.options.sizeIndex].count) {
            return false;
         }
      } else {
         return false;
      }
   }
   return true;
}

async function guestExecute(data) {
   for (const item of data) {
      let productItem =  await Product.findOne({_id : item.product});
      productItem.qty-= item.options.qty;
      productItem.options[item.options.colorIndex].color.sizes[item.options.sizeIndex].count -= item.options.qty;
      await productItem.save();
   }
}

async function customerExecute(customerId, data) {
   let customer = await Customer.findOne({_id: customerId}).populate("reviews");
   if (data.createAddress) {
      const newAddress = new Address({isDefault: true, ...data.contact});
      await newAddress.save().then(doc => customer.addresses.push(doc._id));
   }
   for (const item of data.products) {
      let productItem =  await Product.findOne({_id : item.product});
      productItem.qty-= item.options.qty;
      productItem.options[item.options.colorIndex].color.sizes[item.options.sizeIndex].count -= item.options.qty;
      await productItem.save();
      let reviewKey = customer.reviews.findIndex(itemR => itemR.product == item.product);
      
      if (reviewKey === -1) {
         await Review.create({product: productItem._id, customer: customerId}).then(doc => {
            customer.reviews.push(doc._id);
            let reviewDir = 'client/public/review/' + doc._id;
            if (!fs.existsSync(reviewDir)){
               fs.mkdirSync(reviewDir, err => res.status(400));
           }
         })
      }
   }
   customer.cart = [];
   data.customer = customerId;
   const newOrder = new Order(data);
      newOrder
      .save()
      .then(doc => {
         customer.orders.push(doc._id);
         customer.save()
      })
      .catch(err => res.json(err));
}

exports.validateQty = validateQty;
exports.guestExecute = guestExecute;
exports.customerExecute = customerExecute;

