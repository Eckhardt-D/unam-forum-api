const Post = require("./models/posts");
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

module.exports = async () => {
  const posts = await Post.find();
  return posts.length > 0 ? await updateData(posts) : await seedData();
};
