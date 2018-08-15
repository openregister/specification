---
id: attribute-def
title: Attribute
url: /glossary/attribute/
status: wip
---

***
TODO: Define attribute

***

```elm
type Primitive
  = String
  | Integer
  | Curie
  ...

type Datatype
  = One Primitive
  | Many Primitive

type Attribute =
  { id: AttributeName -- TODO: Fieldname
  , datatype: Datatype
  , title: Maybe String
  , description: Maybe Text
  }
```
