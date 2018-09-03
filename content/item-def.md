---
id: item-def
title: Item
url: /glossary/item
---

An **item** is an unordered set of attribute-value pairs (associative array)
constrained by the [schema](/glossary/schema).

An item is identified by the [hash calculated from its contents](#hash).


```elm
type Item =
  Dict Name String

type Items =
  Dict Hash Item
```

***
**EXAMPLE:**

For example, given a schema defining attributes `name`, `x` and `y` with
datatypes `String`, `Integer` and `Integer` respectively, we can define an
item as follows:

```elm
Item
  [ ("name", "Foo")
  , ("x", "0")
  , ("y", "1")
  ]
```

And can be represented as a `Bar` entity as:

```elm
Bar
  { name = Just "Foo"
  , x = Just 0
  , y = Just 1
  ]
```

Note that all attributes expect an optional value as explained in the
[evolution section](/data-model/evolve#forwards-compatibility).

The item can be serialised in JSON as:

```json
{
  "name": "Foo",
  "x": "0",
  "y": "1"
}
```

Or in CSV as:

```csv
name, x, y
Foo, 0, 1
```

***

***
NOTE: In the example above, the JSON serialisation uses the string
representation of each value and the schema is needed to cast them back to the
right datatype. Check the [Serialisation section](/rest-api#serialisation) and
the [Schema](/glossary/schema) for more details on this topic.
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
  , key: ID "DD"
  , timestamp : Timestamp (2016, 4, 5, 13, 23, 5, Utc)
  , item : [Hash::Sha256 "e1357671d0da24668952373d0cdf9f7659a1b155e45c8fb3c2f24331e46edc26"]
  }
```
***

## Canonicalisation

***

ISSUE: [#24](https://github.com/openregister/registers-rfcs/pull/24) RFC
with an algorithm that doesn't depend on JSON.

***

The canonicalisation algorithm is as follows:

* The data blob MUST be a valid JSON object according to [RFC8259](@rfc8259).
* All insignificant whitespace according to [RFC8259](@rfc8259) MUST be removed.
* The JSON object keys must be valid attribute names. On top of being valid JSON
  keys they MUST be restricted to to the alphabet of lower case letters and
  hyphens (`[a-z][a-z-0-9]*`).
* The JSON object values MUST be sorted into lexicographical order.
* Unicode sequences `\uXXXX` MUST be in upper-case.
* The forward slash or solidus (`/`) MUST be unescaped.
* Non-control characters (i.e. out of the range `\u0000`..`\u001F`) MUST be
  unescaped.

***
**EXAMPLE:**

For example, take an item with two attributes `foo` and `bar` with values `abc`
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

The identity of an item computed from its content.  As the item hash is part
of an [entry](/glossary/entry), it is included in the input to the [entry
hash](/glossary/entry#hash) function.

The function takes an item and a [hashing
algorithm](/glossary/hashing-algorithm) and returns a [Hash
datatype](/datatypes/hash).

```elm
itemHash : Entry -> Alg -> Hash
```

The `sha-256` hash is computed by serialising the item to a canonical form of
JSON, and computing the SHA-256 hash, defined in the [Secure Hash
Standard](@fips-180-4), of the resulting serial form.
