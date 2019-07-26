const { Router } = require("express");
const router = new Router();

const Category = require("../database/models/categories");

router.get("/", async (_, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
