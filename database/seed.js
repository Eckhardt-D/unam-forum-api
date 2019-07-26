const Post = require("./models/posts");
const Category = require("./models/categories");
const Author = require("./models/authors");
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

const createCategoriesAndAuthors = async posts => {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const { categories, author } = post;
    const authorExists = await Author.findOne({ name: author });

    for (let j = 0; j < categories.length; j++) {
      const category = categories[j];
      const exists = await Category.findOne({ name: category });
      if (!exists) {
        await Category.create({ name: category });
      }
    }

    if (!authorExists) {
      await Author.create({ name: author });
    }
  }
};

module.exports = async () => {
  const posts = await Post.find();
  await createCategoriesAndAuthors(posts);
  return posts.length > 0 ? await updateData(posts) : await seedData();
};
