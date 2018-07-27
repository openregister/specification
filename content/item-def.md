---
id: item-def
title: Item
url: /glossary/item/
---

An **item** is an unordered set of attribute-value pairs (associative array)
constrained by the [schema](/glossary/schema/).

An item is identified by the [hash](/datatypes/hash/) calculated from its
contents.

***
NOTE: The hashing algorithm is explained in the [hash datatype
section](/datatypes/hash/).
***

```elm
type Item =
  Dict Fieldname Value

type Items =
  Dict Hash Item
```

***
**EXAMPLE:**

For example, given a schema defining attributes `id`, `x` and `y` with
datatypes `String`, `Integer` and `Integer` respectively, we can define an
item as follows:

```elm
let item =
  [ ("id", "c0ffee")
  , ("x", 0)
  , ("y", 1)
  ]
```

Which can be serialised in JSON as:

```json
{
  "id": "c0ffee",
  "x": "0",
  "y": "1"
}
```

Or in CSV as:

```csv
id, x, y
c0ffee, 0, 1
```

***

***
NOTE: In the example above, the JSON serialisation uses the string
representation of each value and the schema is needed to cast them back to the
right datatype. Check the [Serialisation section](/rest-api#serialisation) and
the [Schema](/glossary/schema/) for more details on this topic.
***

## Conventional attributes

_This section is non-normative._

It is convention for most registers to provide a few common attributes with
particular meaning. These are:

* `start-date`: (Datetime) The date the element started to exist in the world.
  This is not the same as the [Entry timestamp](/glossary/entry#timestamp).
* `end-date`: (Datetime) The date the element stopped to exist in the world.
* `name`: (String) The common name for the element.

***
**EXAMPLE:**

For example, a register could identify an element with `DD` (ISO 3166-2 for
"Germany Democratic Republic") with the data:

```elm
Item
  [ ("id", "DD"),
  , ("start-date", "1949")
  , ("end-date", "1990-10-02")
  , ("official-name", "Germany Democratic Republic")
  , ("name", "East Germany")
  ]
```

But being added to the register on 2016:

```elm
Entry
  { number : 3
  , key: Key "DD"
  , timestamp : Timestamp (2016, 4, 5, 13, 23, 5, Utc)
  , item : [Hash::Sha256 "e1357671d0da24668952373d0cdf9f7659a1b155e45c8fb3c2f24331e46edc26"]
  }
```
***

## Canonicalisation

***
TODO: Reword without depending on JSON
***

The canonicalisation algorithm is as follows:

* JSON object values MUST be sorted into lexicographical order. The keys of a
  JSON object must be a valid field name, which is restricted to the alphabet
  of lower case letters and hyphens, which makes this ordering relatively
  simple to implement.
* All whitespace MUST be removed.
* Characters in strings must be represented as follows:
  * For ASCII control characters (codepoints `0x00 - 0x1f`):
    * If it has a short representation (`\b`, `\f`, `\n`, `\r`, or `\t`), that
      short representation MUST be used.
    * Other control characters (such as `NULL`) MUST be represented as a
      `\u00XX` escape sequence. Hexadecimal digits MUST be upper-case.
  * Backslash (`\`) and double quote (`"`) MUST be escaped as `\\` and `\"`
    respectively.
  * All other characters MUST be included literally (ie unescaped). This
    includes forward-slash (`/`).


***
**EXAMPLE:**

For example, take an item with two fields `foo` and `bar` with values `abc`
and `xyz` respectively. This can be expressed as JSON:

```json
{
  "foo": "abc",
  "bar": "xyz"
}
```

This can then be canonicalised

```json
{"bar":"xyz","foo":"abc"}
```

Then hashed with SHA-256

```shell
$ echo -n '{"bar":"xyz","foo":"abc"}' | shasum -a 256
5dd4fe3b0de91882dae86b223ca531b5c8f2335d9ee3fd0ab18dfdc2871d0c61
```

And finally prepended with the hashing algorithm:

```
sha-256:5dd4fe3b0de91882dae86b223ca531b5c8f2335d9ee3fd0ab18dfdc2871d0c61
```
***


## Hash

The item hash is a function that takes an item and a hashing algorithm and
returns a [Hash datatype](/datatypes/hash/). It is used to identify an address
items and as part of the [entry hash](/glossary/entry#hash).

```elm
itemHash : Entry -> Alg -> Hash
```

***
ISSUE: Define RFC with algorithm and canonicalisation.
***
