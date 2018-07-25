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

## Collection pagination

Collections MUST offer pagination through the [`Link` header](@rfc8288).
Use a `rel="next"` to link to the next page. You MAY offer a previous page
link with `rel="previous"` if you expect iterating backwards.
