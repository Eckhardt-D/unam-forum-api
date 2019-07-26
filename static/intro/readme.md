---
title: Introduction
prev: ../
next: ../docs/
---
## Welcome
This is the University of Namibia's public forum open source JSON API. Below you'll find documentation and examples of what you can expect from the API.

## Motivation
This API was created by [Eckhardt Dreyer](https://github.com/Eckhardt-D), An Accounting Honours student at UNAM, who has been programming for 5+ years.

It was built with the purpose to be incorporated into the cirriculum of Computer Science undergraduates at UNAM with the goals of:

  - Getting exposed to the JavaScript ecosystem.
  - Learning how to build a web-scraper in Node.js.
  - How to design an API server with Express.js.
  - How to work with API's in general.
  - How to helop contribute to open source projects on GitHub.

## Overview of the API
The API (Application Programming Interface) has a few parts to it:

  - A 'web-scraper' using cheerio.js framework which at first seeds the MongoDB database with data scraped and organized from [UNAM's forum](http://forumonline.unam.edu.na) and also periodically scrapes the page for updates.
  - A Node.js (Express framework) server which exposes public URL endpoints for users to make requests to. This will respond with the data in the database, depending on what parameters were provided in the request.
  - The database (MongoDB), which is a non-relational document storage service. Where the JSON data is stored after being scraped and formatted.

> The scraped data is stored in a database, because of the chance that there may be changes to the forum's web page. Which will break the scraper and require fixing.

If you're interested in the scraper, check out the [GitHub](https://github.com/Eckhardt-D/unam-forum-api). It's in the `services` directory.

