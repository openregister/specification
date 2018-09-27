---
id: entry-def
title: Entry
url: /glossary/entry
status: exp
---

An **entry** defines a change in the dataset. The ordered list of entries form
the [log](/glossary/log). Entries are immutable.

Each entry defines a change for an element in the dataset by recording the
time the change was added to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the [item](/glossary/item).

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

* Type: [Integer](/datatypes/integer).

The entry number is unique and defines the position of the entry within the
[log](/glossary/log).

The range MUST be the **positive numbers**, that is the natural numbers
excluding 0.

### Key

* Type: [ID](/key-def#id-type).

The [key](/glossary/key) identifies the element of the dataset which the
entry refers to.

### Timestamp

* Type: [Timestamp](/datatypes/timestamp)

The time when the entry was added to the [log](/glossary/log). This means
that the timestamp is no guarantee of entry order, the [entry
number](#entry-number) is.


### Item references

* Type: Set of [Hash](/datatypes/hash).

The set of [item hashes](/glossary/item#hash) the entry links to.

***
**EXPERIMENTAL:**

It is a set of hashes instead of a single hash due the **index** feature.
***


## Operations

### Hash

The identity of an entry computed from its content. It is used for
[audit](/data-model/audit) as the Merkle tree leaves.

The function takes an entry and a [hashing
algorithm](/glossary/hashing-algorithm) and returns a [Hash
datatype](/datatypes/hash).

```elm
hash : Entry -> HashingAlgorithm -> Hash
```

***
NOTE: When this algorithm operates on _hashes_ (e.g. tag, concatenate) it is
done on bytes, not the hexadecimal string representation.
***

1. Let _number_ be the string representation of the entry number.
2. Let _key_ be the string representation of the entry key.
3. Let _timestamp_ be the string representation of the entry timestamp.
4. Let _items_ be the set of item hashes as bytes.
5. Let _hashList_ be an empty list.
6. Apply the _hashValue_ function to _number_ tagged with `0x69` (Integer). And
   append the result to _hashList_.
7. Apply the _hashValue_ function to _key_ tagged with `0x74` (String). And
   append the result to _hashList_.
8. Apply the _hashValue_ function to _timestamp_ tagged with `0x74` (Timestamp). And
   append the result to _hashList_.
9. Let _itemsBytes_ be an empty set.
10. For each value _item_ in the _items_ set:
    1. Apply the _hashValue_ function to _item_ tagged with `0x72` (Hash) and
       append the result to _itemsBytes_.
11. Sort the elements of _itemsBytes_, concatenate them and
12. Apply the _hashValue_ function tagged with `0x73` (Set). And append the result
    to _hashList_.
13. Concatenate the elements of _hashList_ in order (i.e. `[numberHash,
    keyHash, timestampHash, itemsHash]`), tag it with `0x6C` (List) and hash the
    result.

The **sorting algorithm** for a set of hashes is done by comparing the list of
bytes left to right. For example, given a set `["foo", "bar"]` you'll get the
folllowing byte lists after hashing them as unicode:

```elm
[ [166,166,229,231,131,195,99,205,149,105,62,193,137,194,104,35,21,217,86,134,147,151,115,134,121,181,99,5,242,9,80,56]
, [227,3,206,11,208,244,193,253,254,76,193,232,55,215,57,18,65,226,224,71,223,16,250,97,1,115,61,193,32,103,93,254]
]
```

In this case, the set is already sorted given that `166` is smaller than
`227`.

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
  , item = Set [Hash "6b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb"]
  }
```

Has the following hash:

```elm
Hash "51a02cd5692c6a03ba78330cb68f8e26e976c5933af0aa8d779589a1e6264e4b"
```
***

***
NOTE: The entry hash algorithm is based on the
[objecthash](https://github.com/benlaurie/objecthash) algorithm.
***
