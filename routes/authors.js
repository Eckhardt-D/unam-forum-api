const { Router } = require("express");
const router = new Router();

const Author = require("../database/models/authors");

router.get("/", async (_, res) => {
  const authors = await Author.find();
  res.json(authors);
});

module.exports = router;
