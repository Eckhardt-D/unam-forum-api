---
title: Documentation
---
## Getting started
This page is the documentation of the API itself, the codebase has not been documented as of yet. If you would like to learn about it, for now you can check out the [repo](https://github.com/Eckhardt-D/unam-forum-api), or contact Eckhardt [support@kaizenmedia.co.za]().

## Endpoints

### /

```
GET /
```
**returns:** *this webpage.*

---

### /v1/posts

```
GET /v1/posts
```

**returns:** *Twenty latest posts*
**example response**:

```JSON
{
  [
    {
      "categories": [
          "category1",
          "category2",
          "category3"
      ],
      "_id": "5d38a0acd1e07200172cb032",
      "post_id": "post-1012",
      "post_url": "http://example.com/post",
      "title": "title",
      "author": "author",
      "summary": "Post summary",
      "created": "January 22, 2019",
      "image": "http://example.com/image.jpg",
      "full_text": "Post text",
      "full_html": "<p>Post HTML</p>",
      "__v": 0
    }
  ],
    "start": 0,
    "count": 20
}, ... (x20)
```

[Try](https://unam-api.herokuapp.com/v1/posts)

---

### /v1/posts?count=[number]
```
GET /v1/posts?count=15
```
**default**: *20*

**Max**: *20*

**Min**: *1*

**returns:** *The next twenty posts, starting at the post number given*

[Try](https://unam-api.herokuapp.com/v1/posts?count=15)

---

### /v1/posts?start=[number]
```
GET /v1/posts?start=21
```
**default**: *0*

**returns:** *The next twenty posts, starting at the post number given*

[Try](https://unam-api.herokuapp.com/v1/posts?start=21)

---

### Chaining

> These query params could be chained. eg.
 
```
/v1/posts?start=10&count=15
```

**returns:** *15 posts, starting from the 10th*

[Try](https://unam-api.herokuapp.com/v1/posts?start=10&count=15)

### /v1/categories
```
GET /v1/categories
```
**returns:** *All available post categories*

[Try](https://unam-api.herokuapp.com/v1/categories)

---
