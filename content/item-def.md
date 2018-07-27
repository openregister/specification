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
