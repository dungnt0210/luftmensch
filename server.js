require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// require('mongoose').set('debug', true);

// db configuration
const MONGO_URI = process.env.MONGO_URI;
mongoose
   .connect(MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/blog/", require("./route/blog"));
app.use("/api/product/", require("./route/product"));
app.use("/api/category/", require("./route/category"));
app.use("/order/", require("./route/order"));
app.use("/api/customer/", require("./route/customer"));
app.use("/api/checkout/", require("./route/checkout"));
app.use("/api/address/", require("./route/address"));
app.use("/api/admin/", require("./route/admin"));

app.use("/review/", require("./route/review"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
//"mongodb+srv://dungnt183721:6thsense@cluster0.7fitk.mongodb.net/sixth-sense?retryWrites=true&w=majority"