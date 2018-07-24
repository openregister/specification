---
id: entry-resource
title: Entry resource
url: /resources/entry-resource/
status: wip
---

* Endpoint: `GET /entries/{entry-number}`
* Parameters:
  * `entry-number`: The index of the [Entry](/glossary/#entry).

Response attributes:

* `entry-number`: (Integer) The [entry number](/glossary#entry-number).
* `entry-timestamp`: (Timestamp) The [entry timestamp](/glossary#entry-timestamp).
* `key`: (Any) The [entry key](/glossary#entry-key).
* `item-hash`: ([Hash]) The list of [item hashes](/glossary#entry-item).
* `index-entry-number`: (Integer) The entry number [_experimental_].


***
TODO: Move the entry definition to the glossary
***

An entry is an update to a register. The register as a whole is made up of an
ordered list of entries.  New entries in a register are only ever appended to
the end of the list; once an entry is created, it never gets changed.

An entry is an <a href="#entry-number-field">§9.4 entry-number</a>, an <a
href="#index-entry-number-field">§9.5 index-entry-number</a>, an <a
href="#entry-timestamp-field">§9.6 entry-timestamp</a>, an <a
href="#item-hash-field">§9.7 item-hash</a> and a <a href="#key-field">§9.10
key</a>.  The entry-number is unique and defines the entry’s position within
the ordered list of a register. The index-entry-number is unique and defines
the entry’s position within the ordered list of an index. For an entry in a
register the entry-number and index-entry-number are always identical. The
item-hash identifies the set of <a href="#item-resource">§3.1 Item
resource</a> for the entry. The key represents the primary key value for the
entry.

The entry resource returns an array containing a single entry.

***
TODO: Verify we can't revert back to a single entry (no array)
***

***
**EXAMPLE:**

The following example shows the request for an entry in JSON:

```http
GET /entries/72 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "GH",
    "item-hash": [
      "sha-256:dc1d12943ea264de937468b254286e5ebd8acd316e21bf667076ebdb8c111bd1"
    ]
  }
]
```
***
