const cheerio = require("cheerio");
const fetch = require("node-fetch");
const baseURL = "http://forumonline.unam.edu.na";
const allPath = "/category/all-news";

let posts = [];

const getHTML = async url => {
  const page = await fetch(url);
  const html = await page.text();
  return html;
};

getHTML(baseURL + allPath).then(html => {
  const $ = cheerio.load(html);

  $(".post").each((i, el) => {
    let id = $(el)[0].attribs.id;

    let URL = $(el)
      .find($(".thumbnail-link"))
      .first()
      .attr("href");

    let title = $(el)
      .find($(".entry-title > a"))
      .first()
      .text();

    let snippet = $(el)
      .find($(".entry-author a[rel='author']"))
      .first()
      .text();

    let created = $(el)
      .find($(".entry-date"))
      .first()
      .text();

    console.log(created);
  });
});
