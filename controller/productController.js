const Product = require("../model/Product");

exports.caculateQty = (data) => {
    let qty = 0;
    data.forEach(item => {
       item.color.sizes.forEach(childItem => {
          qty+= parseInt(childItem.count)
       })
    })
    return qty;
 }

exports.search = (req, res) => {
   Product.find({
      $or: 
      [
         { name: { $regex: req.query.q } },
         { description: { $regex: req.query.q } }
      ]
   })
   .sort({createdAt: -1})
   .limit(parseInt(req.query.limit))
   .then( docs => res.status(200).json(docs))
   .catch( err => res.status(404).json({error: err, message: "Error when search product"}));
}