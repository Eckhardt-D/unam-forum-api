const scraper = require("../services/web-scraper");

scraper
  .update([])
  .then(result => console.log(result))
  .catch(err => console.error(err));
