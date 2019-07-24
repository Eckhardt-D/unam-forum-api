const Post = require("./models/posts");
const scraper = require("../services/web-scraper");

module.exports = async () => {
  Post.find().then(async posts => {
    if (posts.length > 0) {
      const missingPosts = await scraper.update(posts);
      if (missingPosts.length) {
        for (let i = 0; i < missingPosts.length; i++) {
          await Post.create(missingPosts[i]);
        }
      }
      return true;
    }

    const seededPosts = await scraper.seed();

    for (let i = seededPosts.length; i >= 0; i--) {
      await Post.create(seededPosts[i]);
    }
    return true;
  });
};
