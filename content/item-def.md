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

1. Let _item_ be the [normalised](#normalise) blob of data to hash.
2. Let _hashList_ be an empty list.
3. Let _valueHash_ be null.
4. Foreach _(name, value)_ pair in _item_:
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
   5. Tag _name_ with `0x75` (String), hash it and set _nameHash_.
   6. Concat _nameHash_ and _valueHash_ in this order, and append to _hashList_.
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

In both cases the resulting [hash](#hash) is

```
12202b90b5d4a714f5fd5f7c670067f090f972dd7be8a472965c90572699249672aa
```

The reason they are
equivalent is because the hash for `"abc"` is
`2a42a9c91b74c0032f6b8000a2c9c5bcca5bb298f004e8eff533811004dea511`.

Notice that the first two bytes of the resulting hash, `0x12` and `0x20`, are
prepended because the [hashing algorithm](/glossary/hashing-algorithm) used in
this example is SHA2-256.
***

### Normalise

Blob normalisation removes nullable values to ensure operations such as
[hashing](#hash) produce the exact same value.

Any value that is an empty String, empty Set or Set with
empty strings in it is normalised as a null value and removed from the
normalised result.

***
NOTE: The nullable normalisation allows parity between formats like JSON
with more rigid formats like CSV. For example, in CSV having an empty field,
empty string, would be normalised as null.
***

```elm
normalise : Item -> Item
```

#### Algorithm

1. Let _blob_ be the blob to normalise.
2. Let _result_ be an empty dictionary.
3. Foreach _(name, value)_ pair in _blob_:
   1. If _value_ is null, continue.
   2. If _value_ is an empty String, continue.
   3. If _value_ is an empty Set, continue.
   4. If _value_ is a Set:
       1. Let _normSet_ be an empty Set.
       2. Foreach _el_ in _value_:
            1. If _el_ is null, continue.
            2. If _el_ is an empty String, continue.
            3. Otherwise, [normalise](#string-normalisation) _el_ and append the
               result to to _normSet_.
       3. If _normSet_ is empty, continue.
       4. Otherwise, set _(name, normSet)_ to _result_.
   5. Otherwise,
        1. Let _normValue_ be null.
        2. [Normalise](#string-normalisation) _value_ and set _normValue_.
        3. Set _(name, normValue)_ to _result_.
4. Return _result_.

#### String normalisation

The **string normalisation algorithm** is the [NFC
form](https://en.wikipedia.org/wiki/Unicode_equivalence) as defined by the
[Unicode standard](@unicode).


### Validate

A blob is valid if all its pairs are valid according to the
[schema](/glossary/schema).

```elm
validate : Item -> Result ValidationError Item
```

#### Algorithm

1. Let _item_ be the [normalised](#normalise) blob of data to hash.
2. Let _schema_ be the list of attribute definitions to valiate against.
2. Let _result_ be null.
3. Foreach _(name, value)_ pair in _item_:
   1. If _name_ doesn't exist in the _schema_, abort. The _item_ has an
      illegal attribute.
   2. Let _attribute_ be the attribute for _name_ found in _schema_.
   3. If _value_ is nullable, abort. The _item_ is not normalised.
   4. If _value_ is a Set:
        1. If _attribute_ has cardinality “1”, abort. The _item_ has an illegal value.
        2. Foreach _el_ in _value_:
            1. If _el_ is nullable, abort. The _item_ is not normalised.
            2. If _el_ is not of the datatype defined in _attribute_,
               abort. The _item_ has an illegal value.
            2. Otherwise, continue.
   5. If _attribute_ has cardinality “n”, abort. The _item_ has an illegal value.
   6. If _value_ is not of the datatype defined in _attribute_, abort.
      The _item_ has an illegal value.
   7. Otherwise, continue.
4. Set _item_ to _result_ and return.

***
NOTE: “nullable” means any value that is considered null in the [normalisation](#normalise)
process.
***

## Conventional attributes

_This section is non-normative._

It is convention for most registers to provide a few common attributes with
particular meaning. These are:

* `start-date`: ([Datetime](/datatypes/datetime)) The date the element started to exist in the world.
  This is not the same as the [Entry timestamp](/glossary/entry#timestamp).
* `end-date`: ([Datetime](/datatypes/datetime)) The date the element stopped to exist in the world.
* `name`: ([String](/datatypes/string)) The common name for the element.

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


