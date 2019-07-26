const { Schema, model } = require("mongoose");
const authorModel = new Schema({ name: String });
const Author = model("author", authorModel);

module.exports = Author;
