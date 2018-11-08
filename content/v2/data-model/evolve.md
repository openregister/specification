---
id: v2-evolve
title: Evolve
url: /v2/data-model/evolve
version: v2
---

<!--
[Schema](/glossary/schema) evolution depends on two pillars: backwards
compatibility and forwards compatibility.
-->

## Backwards compitability

Backwards compitability requires that once a [data
attribute](/glossary/attribute) is introduced its semantics don't change.


## Forwards compatibility

Forwards compatibility requires that tools consuming a register MUST apply the
“must-ignore” rule for unknown attributes and assume that a missing known
attribute is a missing value.

A missing value for a known attribute MUST be treated as the canonical form
for an empty value (i.e. empty string for cardinality 1 or empty set for
cardinality n).

***
**EXAMPLE:**

For example, given a schema such as:

```elm
Schema
  [ Attribute { id = "name", datatype = One String, ... }
  , Attribute { id = "start-date", datatype = One Datetime, ... }
  , Attribute { id = "end-date", datatype = One Datetime, ... }
  ]
```

When given a data blob such as:

```elm
Blob
  [ ("name", "Walnut")
  , ("group", "allergen:24")
  ]
```

The “must-ignore” rule applies by ignoring the unknown `group` datum:

```elm
Allergen
  { id = ID "32"
  , name = Just "Foo"
  , startDate = Nothing
  , endDate = Nothing
  }
```


When instead, the data blob is:

```elm
Blob
  [ ("name", "foo")
  , ("start-date", "2018-08-14")
  ]
```

The “missing-value” rule applies to `end-date`; a consumer must assume the
value for `end-date` is _unknown_ and as such the follwing data blob is
isomorphic:


```elm
Blob
  [ ("name", "Foo")
  , ("start-date", "2018-08-14")
  , ("end-date", "")
  ]
```

And when applying the schema, it can be seen as:

```elm
Allergen
  { id = ID "32"
  , name = Just "Foo"
  , startDate = Just (Datetime 2018 8 14)
  , endDate = Nothing
  }
```

In other words, the `Allergen` type would be defined with all its attributes
as optional:

```elm
type Allergen
  { id : ID
  , name : Maybe String
  , startDate : Maybe Datetime
  , endDate : Maybe Datetime
  }
```

***
