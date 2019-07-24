const { DB_URL } = require("../config");
const mongoose = require("mongoose");
const seedDatabase = require("./seed");

module.exports = mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  async err => {
    if (!err) {
      await seedDatabase();
      console.log("Database connected and updated");
    }
  }
);
