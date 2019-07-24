const { DB_URL } = require("../config");
const mongoose = require("mongoose");
const seedDatabase = require("./seed");

const dbConfig = { useNewUrlParser: true, useFindAndModify: false };

module.exports = mongoose.connect(DB_URL, dbConfig, async err => {
  if (err) throw Error(err);
  console.log("Seeding the database...");
  await seedDatabase();
  setInterval(async () => await seedDatabase(), 3600000);
  console.log("Database connected and seeded");
});
