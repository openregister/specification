### Entry resource

* Path: `/entries/{entry-number}`

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

---

**Example**

The following example shows an entry in the <a href="#json-representation">§11.2 JSON representation</a>:

```json
[
  {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "402019",
    "item-hash": ["sha-256:d9178efd8febfebaaa42968648b7bdd023369c7f"]
  }
]
```

---


