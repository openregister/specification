---
id: record-resource
title: Record resource
url: /resources/record-resource/
---

### Record resource

* Path: `/records/{record-id}`

A record is the most up-to-date <a href="#infoset">§2 Infoset</a> for a
resource identified by a <a href="#primary-key-field">§9.1 Primary key
field</a>.  That is, it is the infoset corresponding to the <a
href="#entry-resource">§3.2 Entry resource</a> with the highest <a
href="#entry-number-field">§9.4 entry-number</a> for a given primary key
value.

This resource is provided as a convenience: in principle, it can be computed
by a client by replaying the log of all entries and finding the latest one
with the given primary key value.

This resource SHOULD provide a <code>Link:</code> header <a
data-link-type="biblio" href="#biblio-rfc8288">[RFC8288]</a> with a relation
of <code>"version-history"</code> <a data-link-type="biblio"
href="#biblio-rfc5829">[RFC5829]</a> to the <a
href="#record-entries-resource">§5.3 Record entries resource</a> for this
record.

---

**Example**

```http
GET /records/E09000019 HTTP/1.1
Host: https://local-authority.register.gov.uk
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

---


