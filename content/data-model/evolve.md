---
id: evolve
title: Evolve
url: /evolve/
status: wip
---

[Schema](/glossary/schema/) evolution depends on two pillars: backwards
compatibility and forwards compatibility.


## Backwards compitability

Backwards compitability requires that once a [data
attribute](/glossary/attribute/) is introduced its semantics don't change.


## Forwards compatibility

Forwards compatibility requires that tools consuming a register MUST apply the
“must-ignore” rule for unknown attributes and assume that a missing known
attribute is a missing value.

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
Item
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
blob
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

And when applying the schema, it is isomorphic to this item:

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
