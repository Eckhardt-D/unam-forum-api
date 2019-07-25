const { Router } = require("express");
const router = new Router();

const Post = require("../database/models/posts");
const { setStart, setCount } = require("../services/query-handlers");

router.get("/", async (req, res) => {
  const posts = await Post.find();
  let { start = 0, count = 20, category, author, from, to } = req.query;
  let response = {
    data: [""],
    start,
    count,
    from: new Date(),
    to: new Date(),
  };

  start = setStart(start, posts.length);
  count = setCount(start, count, posts.length);

  response.data = posts.filter((_, index) => index >= start && index < start + count).reverse();

  res.json({ from, to, ...response });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    post ? res.json(post) : res.sendStatus(404);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
