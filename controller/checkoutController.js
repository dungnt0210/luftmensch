exports.validateQty = (data) => {
    let qty = 0;
    data.forEach(item => {
       item.color.sizes.forEach(childItem => {
          qty+= parseInt(childItem.count)
       })
    })
    return qty;
 }