---
id: entry-def
title: Entry
url: /glossary/entry/
status: exp
---

An **entry** defines a change in the dataset. The ordered list of entries form
the [log](/glossary/log/). Entries are immutable resources.

Each entry defines a change for an element in the dataset by recording the
time the change was added to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the [item](/glossary/item/).

```elm
type Entry =
  { number: Integer
  , timestamp: Timestamp
  , key: ID
  , item: List Hash
  }
```

## Attributes

### Number

* Type: [Integer](/datatypes/integer/).

The entry number is unique and defines the position of the entry within the
[log](/glossary/log/).

***
**EXPERIMENTAL:**

The index entry number is unique and defines
the entry position within an index log. For an entry in a
register the entry-number and index-entry-number are always identical.
***

### Key

* Type: [ID](/key-def#constraints).

The [key](/glossary/key/) identifies the element of the dataset which the
entry refers to.

### Timestamp

* Type: [Timestamp](/datatypes/timestamp/)

The time when the entry was added to the [log](/glossary/log/). This means
that the timestamp is no guarantee of entry order, the [entry
number](#entry-number) is.


### Item references

* Type: Set of [Hash](/datatypes/hash/).

The set of [item hashes](/glossary/item#hash) the entry links to.

***
**EXPERIMENTAL:**

It is a set of hashes instead of a single hash due the **index** feature.
***


## Hash

The identity of an entry computed from its content. It is used for
[audit](/data-model/audit/) as the  Merkle tree leaf hashes.

The function takes an entry and a [hashing
algorithm](/glossary/hashing-algorithm/) and returns a [Hash
datatype](/datatypes/hash/).

```elm
entryHash : Entry -> Alg -> Hash
```

***
ISSUE: [#23](https://github.com/openregister/registers-rfcs/pull/23) Define
RFC with algorithm and attributes involved.
***
