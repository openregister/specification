---
id: entry-def
title: Entry
url: /glossary/entry
version: v1
---

An **entry** defines a change in the dataset. The ordered list of entries form
the [log](/v1/glossary/log). Entries are immutable.

Each entry defines a change for an element in the dataset by recording the
time the change was added to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the [item](/v1/glossary/item).

```elm
type Entry =
  { number: Integer
  , timestamp: Timestamp
  , key: ID
  , item: Set Hash
  }
```

## Attributes

### Number

* Type: [Integer](/v1/datatypes/integer).

The entry number is unique and defines the position of the entry within the
[log](/v1/glossary/log).

The range MUST be the **positive numbers**, that is the natural numbers
excluding 0.

***
**EXPERIMENTAL:**

The index entry number is unique and defines
the entry position within an index log. For an entry in a
register the entry-number and index-entry-number are always identical.
***

### Key

* Type: [ID](/v1/key-def#id-type).

The [key](/v1/glossary/key) identifies the element of the dataset which the
entry refers to.

### Timestamp

* Type: [Timestamp](/v1/datatypes/timestamp)

The time when the entry was added to the [log](/v1/glossary/log). This means
that the timestamp is no guarantee of entry order, the [entry
number](#entry-number) is.


### Item references

* Type: Set of [Hash](/v1/datatypes/hash).

The set of [item hashes](/v1/glossary/item#hash) the entry links to.

## Hash

The identity of an entry computed from its content. It is used for
[audit](/v1/data-model#audit) as the Merkle tree leaf hashes.

The function takes an entry and a hashing algorithm and returns a [Hash
datatype](/v1/datatypes/hash).
