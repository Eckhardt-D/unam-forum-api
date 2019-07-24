const { DB_URL } = require("../config");
const scraper = require("../services/web-scraper");
const mongoose = require("mongoose");

module.exports = mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  err => {
    if (!err) {
      console.log("Database connected");
    }
  }
);
