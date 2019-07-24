const cheerio = require("cheerio");
const fetch = require("node-fetch");
// const { writeFileSync, readFile } = require("fs");
const { join } = require("path");
const baseURL = "http://forumonline.unam.edu.na";
const allPath = "/category/all-news";

let posts = [];

const getHTML = async url => {
  const page = await fetch(url);
  const html = await page.text();
  return html;
};

const getFullContent = async url => {
  try {
    let html = await getHTML(url);
    let $ = await cheerio.load(html);

    let full_text = await $(".entry-content")
      .first()
      .text();
    let full_html = await $(".entry-content")
      .first()
      .html();

    return { full_html, full_text };
  } catch (e) {
    return e;
  }
};

const parseCurrentPagePosts = async url => {
  const html = await getHTML(url);
  let $ = cheerio.load(html);
  let postArr = $(".post");
  let len = postArr.length;

  for (let i = 0; i < len; i++) {
    const el = $(postArr[i]);

    let id = await el[0].attribs.id;

    let post_url = await el
      .find($(".thumbnail-link"))
      .first()
      .attr("href");

    let title = await el
      .find($(".entry-title > a"))
      .first()
      .text();

    let author = await el
      .find($(".entry-author a[rel='author']"))
      .first()
      .text();

    let summary = await el
      .find($(".entry-summary"))
      .first()
      .text();

    let created = await el
      .find($(".entry-date"))
      .first()
      .text();

    let image = await el
      .find(".thumbnail-wrap img")
      .first()
      .attr("src")
      .replace("-300x200", "");

    let page_content = await getFullContent(post_url);

    let { full_text, full_html } = page_content;

    posts.push({
      id,
      post_url,
      title,
      author,
      summary,
      created,
      image,
      full_text,
      full_html,
    });
  }

  return posts;
};

const requestOK = async url => {
  try {
    const response = await fetch(url);
    if (response.status === 404) return false;
    return true;
  } catch {
    return false;
  }
};

const scrapeRecursive = async () => {
  let currentPage = 1;
  let paginationURL = baseURL + allPath + "/page/";

  while (true) {
    let ok = await requestOK(paginationURL + currentPage);

    if (!ok) break;

    await parseCurrentPagePosts(paginationURL + currentPage);

    currentPage++;
  }
  return posts;
};

const checkIfUpdated = async () => {
  let url = baseURL + allPath + "/page/1";
  let parsed = await parseCurrentPagePosts(url);

  readFile(join(__dirname, "../data/posts.json"), (err, data) => {
    if (err) return false;
    let saved = JSON.parse(data);

    if (parsed[0].id === saved[0].id) {
      return true;
    }

    // TODO: implement adding stuff

    return false;
  });
};

checkIfUpdated()
  .then(res => res)
  .catch(e => e);

// scrapeRecursive()
//   .then(response => {
//     writeFileSync(
//       join(__dirname, "../data/posts.json"),
//       JSON.stringify(response),
//       {
//         encoding: "utf8",
//       }
//     );
//   })
//   .catch(e => console.error(e));
