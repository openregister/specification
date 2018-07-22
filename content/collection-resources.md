---
id: collection-resources
title: Collection resources
url: /resources/collections/
status: wip
---

## Collection resources

There is a limit to how many records or entries can be returned in a single
request. To fetch more, pagination is used. Pagination is supported through an
http link header <a data-link-type="biblio"
href="#biblio-rfc8288">[RFC8288]</a>, with a link `rel="next"` for
the next page, and <code>rel="previous"</code> for the previous page. On the
first page, there is no <code>"previous"</code> link, and on the last page
there is no `"next"` link.
