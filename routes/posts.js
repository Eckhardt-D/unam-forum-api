const Post = require("../database/models/posts");
const { Router } = require("express");

const router = new Router();

router.get("/", async (_, res) => {
  const posts = await Post.find();
  res.json(posts.reverse());
});

module.exports = router;
