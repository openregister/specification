---
id: v2-attribute-def
title: Attribute
url: /v2/glossary/attribute
version: v2
---

An **attribute** defines the characteristics of a value part of a
[blob](/v2/glossary/blob) of data. It is the building block for the
[schema](/v2/glossary/schema).

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

* Type: [Name](/v2/datatypes/name).

The id, uniquely identifies the attribute. Once an attribute exists in a
[schema](/v2/glossary/schema), it can't change its identifier.


### Datatype

* Type: [Datatype](/v2/datatypes).

The datatype (primitive and cardinality) that applies to any value for this
attribute. Once defined, it can't be changed.

### Title

* Type: Optional [String](/v2/datatypes/string).

The title is the human readable version of the identifier.

### Description

* Type: Optional [Text](/v2/datatypes/text).

The description is a formatted text to describe the purpose of the attribute.
