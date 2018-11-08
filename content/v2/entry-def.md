---
id: v2-entry-def
title: Entry
url: /v2/glossary/entry
version: v2
---

An **entry** defines a change in the dataset. The ordered list of entries form
the [log](/v2/glossary/log). Entries are immutable.

Each entry defines a change for an element in the dataset by recording the
time the change was added to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the [blob](/v2/glossary/blob).

```elm
type Entry =
  { number: Integer
  , timestamp: Timestamp
  , key: ID
  , blob: Hash
  }
```

## Attributes

### Number

* Type: [Integer](/v2/datatypes/integer).

The entry number is unique and defines the position of the entry within the
[log](/v2/glossary/log).

The range MUST be the **positive numbers**, that is the natural numbers
excluding 0.

### Key

* Type: [ID](/key-def#id-type).

The [key](/v2/glossary/key) identifies the element of the dataset which the
entry refers to.

### Timestamp

* Type: [Timestamp](/v2/datatypes/timestamp)

The time when the entry was added to the [log](/v2/glossary/log). This means
that the timestamp is no guarantee of entry order, the [entry
number](#entry-number) is.


### Blob references

* Type: [Hash](/v2/datatypes/hash).

The [blob hash](/v2/glossary/blob#hash) the entry links to.


## Operations

### Hash

The identity of an entry computed from its content. It is used for
[audit](/v2/data-model/audit) as the Merkle tree leaves.

The function takes an entry and a [hashing
algorithm](/v2/glossary/hashing-algorithm) and returns a [Hash
datatype](/v2/datatypes/hash).

```elm
hash : Entry -> HashingAlgorithm -> Hash
```

***
NOTE: When this algorithm operates on _hashes_ (e.g. tag, concatenate) it is
done on bytes, not the hexadecimal string representation.
***

1. Let _hashList_ be an empty list.
2. Let _number_ be the string representation of the entry number.
3. Let _key_ be the string representation of the entry key.
4. Let _timestamp_ be the string representation of the entry timestamp.
5. Let _blob_ be the list of bytes of the blob hash.
6. Apply the _hashValue_ function to _number_ tagged with `0x69` (Integer). And
   append the result to _hashList_.
7. Apply the _hashValue_ function to _key_ tagged with `0x75` (String). And
   append the result to _hashList_.
8. Apply the _hashValue_ function to _timestamp_ tagged with `0x74` (Timestamp). And
   append the result to _hashList_.
9. Apply the _hashValue_ function to _blob_ tagged with `0x72` (Hash). And
   append the result to _hashList_.
10. Concatenate the elements of _hashList_ in order (i.e. `[numberHash,
    keyHash, timestampHash, blobHash]`), tag it with `0x6C` (List) and hash the
    result.

The **tagging** operation prepends a byte identifying the type to a list of
bytes.

Tags:

* Integer: `0x69`
* List: `0x6C`
* Hash: `0x72`
* Set: `0x73`
* Timestamp: `0x74`
* String: `0x75`

***
**EXAMPLE:**

For example, the following entry:

```elm
Entry
  { number = 6
  , key = ID "GB"
  , timestamp = Timestamp 2016 4 5 13 23 5 Utc
  , blob = Hash "12206b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb"
  }
```

Has the following hash:

```elm
Hash "122002f78a0faf50516849602399b6be7b1a0775fccc3ea0318fda9c6fcf7a4000cb"
```
***

***
NOTE: The entry hash algorithm is based on the
[objecthash](https://github.com/benlaurie/objecthash) algorithm.
***
