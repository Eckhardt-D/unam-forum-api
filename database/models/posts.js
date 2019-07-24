const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post_id: String,
  post_url: String,
  title: String,
  author: String,
  summary: String,
  created: String,
  image: String,
  full_text: String,
  full_html: String,
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
