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
