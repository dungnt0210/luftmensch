require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db configuration
const MONGO_URI = process.env.MONGO_URI;
mongoose
   .connect(MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log("Mongo Connection successful"))
   .catch(err => console.log("err"));

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use("/blog/", require("./route/blog"));
app.use("/product/", require("./route/product"));
app.use("/category/", require("./route/category"));
app.use("/order/", require("./route/order"));
app.use("/customer/", require("./route/customer"));

app.use("/review/", require("./route/review"));
app.use("/user/", require("./route/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
