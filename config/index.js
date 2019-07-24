module.exports = {
  // Getting the server port if it's available or hard-coding it
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/unam-forum",
};
