const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDB() {
  return mongoose.connect("mongodb://127.0.0.1:27017/url-short-service");
}

module.exports = { connectMongoDB };
