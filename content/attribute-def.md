---
id: attribute-def
title: Attribute
url: /glossary/attribute
---

An **attribute** defines the characteristics of a value part of a
[blob](/glossary/item) of data. It is the building block for the
[schema](/glossary/schema).

```elm
type Attribute =
  { id : Name
  , datatype : Datatype
  , title : Maybe String
  , description : Maybe Text
  }
```

## Attributes

### Id

* Type: [Name](/datatypes/name).

The id, uniquely identifies the attribute. Once an attribute exists in a
[schema](/glossary/schema), it can't change its identifier.


### Datatype

* Type: [Datatype](/datatypes).

The datatype (primitive and cardinality) that applies to any value for this
attribute. Once defined, it can't be changed.

### Title

* Type: Optional [String](/datatypes/string).

The title is the human readable version of the identifier.

### Description

* Type: Optional [Text](/datatypes/text).

The description is a formatted text to describe the purpose of the attribute.
