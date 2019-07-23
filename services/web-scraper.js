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

const getFullContent = async url => {
  getHTML(url).then(html => {
    let $ = cheerio.load(html);
    const full_text = $(".entry-content").text();
    const full_html = $(".entry-content").html();

    console.log(full_text);

    return {
      full_text,
      full_html,
    };
  });
};

const parseCurrentPagePosts = async () => {
  getHTML(baseURL + allPath).then(html => {
    let $ = cheerio.load(html);

    $(".post").each(async (i, el) => {
      let id = $(el)[0].attribs.id;

      let post_url = $(el)
        .find($(".thumbnail-link"))
        .first()
        .attr("href");

      let title = $(el)
        .find($(".entry-title > a"))
        .first()
        .text();

      let author = $(el)
        .find($(".entry-author a[rel='author']"))
        .first()
        .text();

      let summary = $(el)
        .find($(".entry-summary"))
        .first()
        .text();

      let created = $(el)
        .find($(".entry-date"))
        .first()
        .text();

      let image = $(el)
        .find(".thumbnail-wrap img")
        .first()
        .attr("src")
        .replace("-300x200", "");

      // let page_content = await getFullContent(post_url);

      // let { full_text, full_html } = page_content;

      return {
        id,
        post_url,
        title,
        author,
        summary,
        created,
        image,
        // full_text,
        // full_html,
      };
    });
  });
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
  const paginationURL = baseURL + "/page/";

  while (true) {
    const ok = await requestOK(paginationURL + currentPage);
    if (!ok) break;

    const post = await parseCurrentPagePosts();
    posts.push(post);

    currentPage++;
  }

  return posts;
};

scrapeRecursive()
  .then(() => {
    console.log(posts);
  })
  .catch(e => console.error(e));
