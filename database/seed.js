const Post = require("./models/posts");
const Category = require("./models/categories");
const scraper = require("../services/web-scraper");

const updateData = async posts => {
  const missingPosts = await scraper.update(posts);

  if (missingPosts.length) {
    for (let i = 0; i < missingPosts.length; i++) {
      await Post.create(missingPosts[i]);
    }
  }

  return true;
};

const seedData = async () => {
  const seededPosts = await scraper.seed();

  for (let i = seededPosts.length; i >= 0; i--) {
    await Post.create(seededPosts[i]);
  }

  return true;
};

const createCategories = async posts => {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const { categories } = post;

    // Run check before looping, in case categories are same
    const dbCategories = await Category.find();
    if (dbCategories.length === categories.length) return true;

    for (let j = 0; j < categories.length; j++) {
      const category = categories[j];

      const exists = await Category.findOne({ name: category });
      if (!exists) {
        await Category.create({ name: category });
      }
    }
  }
};

module.exports = async () => {
  const posts = await Post.find();
  await createCategories(posts);
  return posts.length > 0 ? await updateData(posts) : await seedData();
};
