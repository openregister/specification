---
id: v1-attribute-def
title: Attribute
url: /v1/glossary/attribute
version: v1
---

An **attribute** defines the characteristics of a value part of a
[blob](/v1/glossary/item) of data. It is the building block for the
[schema](/v1/glossary/schema).

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

* Type: [Name](/v1/datatypes/name).

The id, uniquely identifies the attribute. Once an attribute exists in a
[schema](/v1/glossary/schema), it can't change its identifier.


### Datatype

* Type: [Datatype](/v1/datatypes).

The datatype (primitive and cardinality) that applies to any value for this
attribute. Once defined, it can't be changed.

### Title

* Type: Optional [String](/v1/datatypes/string).

The title is the human readable version of the identifier.

### Description

* Type: Optional [Text](/v1/datatypes/text).

The description is a formatted text to describe the purpose of the attribute.
