const Post = require("./models/posts");
const scraper = require("../services/web-scraper");

module.exports = async () => {
  // Check if there are posts
  Post.find().then(async posts => {
    // yes: update posts
    if (posts.length > 0) {
      const missingPosts = await scraper.update(posts);
      if (missingPosts.length) {
        for (let i = missingPosts.length - 1; i >= 0; i--) {
          await Post.create(missingPosts[i]);
        }
      }
      return true;
    }

    // no: seed posts
    const seededPosts = await scraper.seed();

    for (let i = seededPosts.length; i >= 0; i--) {
      await Post.create(seededPosts[i]);
    }
    return true;
  });
};
