const cheerio = require("cheerio");
const fetch = require("node-fetch");
const baseURL = "http://forumonline.unam.edu.na";
const allPath = "/category/all-news";

let posts = [];

const getHTML = async url => {
  try {
    const page = await fetch(url);
    const html = await page.text();
    return html;
  } catch (e) {
    return e;
  }
};

const getFullContent = async url => {
  try {
    let html = await getHTML(url);
    let $ = cheerio.load(html);

    let full_text = $(".entry-content")
      .first()
      .text();

    let full_html = $(".entry-content")
      .first()
      .html();

    return { full_html, full_text };
  } catch (e) {
    return e;
  }
};

const parseCurrentPagePosts = async url => {
  try {
    const html = await getHTML(url);
    let $ = cheerio.load(html);
    let postArr = $(".post");
    let len = postArr.length;

    for (let i = 0; i < len; i++) {
      const el = $(postArr[i]);

      let post_id = el[0].attribs.id;

      let post_url = el
        .find($(".thumbnail-link"))
        .first()
        .attr("href");

      let title = el
        .find($(".entry-title > a"))
        .first()
        .text();

      let author = el
        .find($(".entry-author a[rel='author']"))
        .first()
        .text();

      let summary = el
        .find($(".entry-summary"))
        .first()
        .text();

      let created = el
        .find($(".entry-date"))
        .first()
        .text();

      let image = el
        .find(".thumbnail-wrap img")
        .first()
        .attr("src")
        .replace("-300x200", "");

      let page_content = await getFullContent(post_url);

      let { full_text, full_html } = page_content;

      posts.push({
        post_id,
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
  } catch (e) {
    return e;
  }
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

const scrapeRecursive = async update => {
  try {
    let currentPage = 1;
    let paginationURL = baseURL + allPath + "/page/";

    while (true) {
      let ok = await requestOK(paginationURL + currentPage);

      if (!ok) break;

      await parseCurrentPagePosts(paginationURL + currentPage);

      if (!update) {
        currentPage++;
      } else {
        break;
      }
    }
    return posts;
  } catch (e) {
    return e;
  }
};

async function main(update = false) {
  try {
    const parsed = await scrapeRecursive(update);
    posts = parsed;
  } catch (e) {
    return e;
  }
}

async function seed() {
  try {
    await main();
    return posts;
  } catch (e) {
    return e;
  }
}

async function update(databasePosts) {
  let missing = [];

  try {
    await main(true);

    for (let i = 0; i < posts.length - 1; i++) {
      if (posts[i].post_id != databasePosts[databasePosts.length - 1].post_id) {
        missing.unshift(posts[i]);
      } else {
        break;
      }
    }

    return missing;
  } catch (e) {
    console.error(e);
    return missing;
  }
}

module.exports = {
  seed,
  update,
};
