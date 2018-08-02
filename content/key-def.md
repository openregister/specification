---
id: key-def
title: Key
url: /glossary/key/
---

A **key** is the identifier for an element in the dataset and thus, it MUST be
unique within a register. Each [entry](/glossary/entry#key) defines what is
the element affected through their key. Also, a [record](/glossary/record/) is
identified by the key within the [snapshot](/glossary/snapshot/).

A key MUST be of type [ID](/datatypes/id/).

```elm
key : ID
```


***
**EXAMPLE:**

For example, given the latest entry with key `DD`, the record:

```elm
Entry
  { number : 3
  , key: ID "DD"
  , timestamp : Timestamp (2016, 4, 5, 13, 23, 5, Utc)
  , item : [Hash::Sha256 "e1357671d0da24668952373d0cdf9f7659a1b155e45c8fb3c2f24331e46edc26"]
  }
```

And, given that the [item](/glossary/item/) referenced from the record is:

```elm
Item
  [ ("id", "DD"),
  , ("start-date", "1949")
  , ("end-date", "1990-10-02")
  , ("official-name", "Germany Democratic Republic")
  , ("name", "East Germany")
  ]
```

The `Country` element for `DD` is:

```elm
Country
  { id : ID "DD"
  , startDate : Datetime (1949)
  , endDate : Datetime (1990, 10, 2)
  , officialName : "Germany Democratic Republic"
  , name : "East Germany"
  }
```

In all data structures, the constant is the key that links everything
together.
***
