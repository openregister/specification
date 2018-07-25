---
id: record-resource
title: Record resource
url: /resources/record-resource/
status: wip
---

* Endpoint: `GET /records/{key}`
* Parameters:
  * `key`: The record identifier.


***
TODO: Review

This resource is provided as a convenience: in principle, it can be computed
by a client by replaying the log of all entries and finding the latest one
with the given primary key value.
***

This resource SHOULD provide a [`Link:` header](@rfc8288) with a
`rel="version-history"` [[RFC5829](@rfc5829)]</a> to the corresponding [Record
entries resource](/resources/record-entries-resource/) for this record.

***
**EXAMPLE:**

```http
GET /records/E09000019 HTTP/1.1
Host: local-authority.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "E09000019": {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000019",
    "item": [
        {
          "local-authority": "E09000019",
          "name": "Islington"
        }
    ]
  }
}
```
***
