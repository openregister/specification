## HTTP Headers

Table of link and other HTTP headers used by resources ..

* <a data-link-type="biblio" href="#biblio-rfc8288">[RFC8288]</a>
* <a href="http://www.iana.org/assignments/link-relations/link-relations.xhtml">link-relations</a>
* <a href="#immutable-resources">§4 Immutable resources</a> SHOULD be served with a long-lived Cache-Control max-age value <a data-link-type="biblio" href="#biblio-rfc7234">[RFC7234]</a>.
* the <a href="#item-hash-field">§9.7 item-hash</a> SHOULD be served as the etag header value for an <a href="#item-resource">§3.1 Item resource</a>.

The following example shows the HTTP headers for the §11.2 JSON representation of an immutable §3.1 Item resource:

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


