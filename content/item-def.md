---
id: item-def
title: Item
url: /glossary/item
---

An **item** is an unordered set of attribute-value pairs (associative array)
constrained by the [schema](/glossary/schema) and identified by the [hash
calculated from its contents](#hash).

Values are either strings or sets of strings according to the
[Attribute](/glossary/attribute) cardinality.

```elm
type Value
  = StringValue String
  | SetValue (Set String)

type Item =
  Dict Name Value
```

***
**EXAMPLE:**

For example, given a schema defining attributes `name`, `x` and `y` with
datatypes `String`, `Integer` and `Integer` respectively. Also, `y` has
cardinality `n`.  We can define an item as follows:

```elm
Item
  [ ("name", "Foo")
  , ("x", "0")
  , ("y", ["1", "2"])
  ]
```

And can be represented as a `Bar` entity as:

```elm
Bar
  { name = Just "Foo"
  , x = Just 0
  , y = Just [1, 2]
  ]
```

Note that all attributes expect an optional value as explained in the
[evolution section](/data-model/evolve#forwards-compatibility).

The item can be serialised in JSON as:

```json
{
  "name": "Foo",
  "x": "0",
  "y": ["1", "2"]
}
```

Or in CSV as:

```csv
name, x, y
Foo, 0, 1;2
```
***

***
NOTE:

In the example above, the JSON serialisation uses the string representation of
each primitive value and the schema is needed to cast them back to the right
datatype. Check the [Serialisation section](/rest-api#serialisation) and the
[Schema](/glossary/schema) for more details on this topic.
***

## Operations

### Hash

The **hash** is the identity of an item computed from its content. As the item
hash is part of an [entry](/glossary/entry), it is included in the input to
the [entry hash](/glossary/entry#hash) function.

The function takes an item and a [hashing
algorithm](/glossary/hashing-algorithm) and returns a [Hash
datatype](/datatypes/hash).

```elm
hash : Item -> HashingAlgorithm -> Hash
```

#### Algorithm

***
NOTE: When this algorithm operates on hashes (e.g. tag, concatenate) it is
done on bytes, not the hexadecimal string representation.
***

1. Let _item_ be the normalised blob of data to hash.
2. Let _hashList_ be an empty list.
3. Let _valueHash_ be null.
4. Foreach _(attr, value)_ pair in _item_:
   1. If _value_ is null, continue.
   2. If _value_ is a Set:
        1. Let _elList_ be an empty list.
        2. Foreach _el_ in _value_:
            1. If _el_ starts with `**REDACTED**`, append _el_ without `**REDACTED**`
               to _elList_.
            2. Otherwise, normalise _el_ according to string normalisation
               tag it with `0x75` (String), hash it and append it to _elList_.
            3. Concatenate _elList_ elements, sort them, tag it with `0x73`
               (Set), hash it and set it to _valueHash_.
   3. If _value_ starts with `**REDACTED**`, set _valueHash_ with _value_
      without `**REDACTED**`.
   4. Otherwise, normalise _value_ according to string normalisation
      tag it with `0x75` (String), hash it and set _valueHash_.
   5. Tag _attr_ with `0x75` (String), hash it and set _attrHash_.
   6. Concat _attrHash_ and _valueHash_ in this order, and append to _hashList_.
5. Sort _hashList_.
6. Concat _hashList_ elements, tag with `0x64`, hash it and return.

#### Sorting

The **sorting algorithm** for a set of hashes is done by comparing the list of
bytes one by one. For example, given a set `["foo", "bar"]` you'll get the
folllowing byte lists after hashing them as unicode:

 ```elm
[ [166,166,229,231,131,195,99,205,149,105,62,193,137,194,104,35,21,217,86,134,147,151,115,134,121,181,99,5,242,9,80,56]
, [227,3,206,11,208,244,193,253,254,76,193,232,55,215,57,18,65,226,224,71,223,16,250,97,1,115,61,193,32,103,93,254]
]
```

The set sorted given that `166` is smaller than `227`.

#### Tagging

The **tagging** operation prepends a byte identifying the type to a list of
bytes.

Tags:

* Dict: `0x64`
* Hash: `0x72`
* Set: `0x73`
* String: `0x75`

The **string normalisation algorithm** is the [NFC
form](https://en.wikipedia.org/wiki/Unicode_equivalence) as defined by the
[Unicode standard](@unicode).

***
NOTE: The item hashing algorithm is an implementation of the
[objecthash](https://github.com/benlaurie/objecthash) algorithm.
***


### Redact

To redact a value, you need to take its hash (the partial hash resulting of
the algorithm above) and, on its string hexadecimal representation prepend the
string `**REDACTED**`.

```elm
redact : Name -> HashingAlgorithm -> Item -> Item
```

***
**EXAMPLE:**

For example,

```elm
i_0 = 
  Item
    [ ("foo", "abc")
    , ("bar", "xyz")
    ]

redact "foo" i_0
```

Will result in

```elm
Item
  [ ("foo", "**REDACTED**2a42a9c91b74c0032f6b8000a2c9c5bcca5bb298f004e8eff533811004dea511")
  , ("bar", "xyz")
  ]
```

And both items will have the same resulting hash. The reason they are
equivalent is because the hash for `"abc"` is
`2a42a9c91b74c0032f6b8000a2c9c5bcca5bb298f004e8eff533811004dea511`.
***

### Normalise

```elm
normalise : Item -> Item
```

***
ISSUE: Pending RFC0020 approval
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
  [ ("start-date", "1949")
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


