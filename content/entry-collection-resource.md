---
id: entry-collection-resource
title: List entries
url: /resources/list-entries/
---

### Entries resource

* Path: `/entries`


The entries resource returns the ordered list of all <a
href="#entry-resource">§3.2 Entry resource</a>s ordered by entry number in
ascending order.</p>

---

**Example**

```json
[
  {
    "index-entry-number": "1",
    "entry-number": "1",
    "entry-timestamp": "2015-08-15T08:15:30Z",
    "key": "402019",
    "item-hash": [ 
        "sha-256:1a0212ba5094383bcc2a0bbe1a55e3a1f1278984"
    ]
  },
  {
    "index-entry-number": "2",
    "entry-number": "2",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "402020",
    "item-hash": [
        "sha-256:13f6de75b9f6d970691985e72a7dfa211bad1591"
    ]
  },
  {
    "index-entry-number": "3",
    "entry-number": "3",
    "entry-timestamp": "2015-08-21T00:00:00Z",
    "key": "402020",
    "item-hash": [
        "sha-256:13f6de75b9f6d970691985e72a7dfa211ba00000"
    ]
  }
]
```

---


