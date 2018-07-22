---
id: record-entry-collection-resource
title: List record entries
url: /resources/list-record-entries/
status: wip
---

### Record entries resource

* Path: `/records/{field-value}/entries`

All of the entries which have the given <a href="#primary-key-field">§9.1
Primary key field</a> value, in order of <a href="#entry-number-field">§9.4
entry-number</a>.

***
**EXAMPLE:**

```json
[
  {
    "index-entry-number": "121",
    "entry-number": "121",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "33010",
    "item-hash": [
        "sha-256:c8844f3961a9a90812b8992ad8dbd5495e0f4782"
    ]
  },
  {
    "index-entry-number": "133",
    "entry-number": "133",
    "entry-timestamp": "2015-08-15T08:15:30Z",
    "key": "33010",
    "item-hash": [
        "sha-256:13f6de75b9f6d970691985e72a7dfa211bad1591"
    ]
  }
]
```
***
