---
id: rest-api
title: REST API
url: /resources/
status: wip
---

***
TODO: Describe the goal of this REST API and generic stuff. Perhaps consider
OpenAPI
***

## Collection resources

There is a limit to how many records or entries can be returned in a single
request. To fetch more, pagination is used. Pagination is supported through an
http link header [RFC8288](@rfc8288), with a link `rel="next"` for the next
page, and `rel="previous"` for the previous page. On the first page, there is
no `"previous"` link, and on the last page there is no `"next"` link.

## HTTP Headers

Table of link and other HTTP headers used by resources.

***
TODO: Consider moving specific information to the resource itself.
***

* [RFC8288](@rfc8288).
* [link-relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml).
* **Immutable resources** SHOULD be served with a long-lived `Cache-Control max-age` ([RFC7234](@rfc7234)).
* The item [hash](/datatypes/hash-datatype/) SHOULD be served as the `etag` header value for an [Item resource](/resources/item-resource/).

***
**EXAMPLE:**

The following example shows the HTTP headers for an item resource:

```http
HTTP/1.1 200 OK
Date: Fri, 22 Jan 2016 08:00:08 GMT
Expires: Sun, 22 Jan 2017 08:00:08 GMT
Link: </school/12345/entries>; rel="version-history"
Content-Type: application/json
Content-Security-Policy: default-src 'self'
Cache-Control: no-transform, max-age=31536000
etag: c2f6fb7ed8332561f2252359b7d6f173a376a942
X-Xss-Protection "1; mode=block"
X-Frame-Options "SAMEORIGIN"
X-Content-Type-Options "nosniff"
Vary: Accept-Encoding
Content-Length: 522
```
***
