---
id: datatypes
title: Datatypes
url: /datatypes/
---

## Primitives

A primitive **datatype** defines a set of rules and expectations for a value
in a [blob of data](/glossary/item/).

```elm
type Primitive
  = Curie
  | Datetime
  | Attrname
  ...
```

The table below lists the identifiers for each available primitive datatype.
These identifiers are used by the [schema resource](/rest-api/schema/).

| Identifier | Name | Description |
|-|-|-|
| `curie` | [CURIE](/datatypes/curie/) | A Link between registers |
| `datetime` | [Datetime](/datatypes/datetime/) | A date with flexible accuracy |
| `attrname` | [Attribute Name](/datatypes/attrname/) | A restricted string suitable for identifiers |
| `hash` | [Hash](/datatypes/hash/) | A hashing algorithm digest |
| `integer` | [Integer](/datatypes/integer/) | A base 10 number |
| `period` | [Period](/datatypes/period/) | A period of time |
| `point` | [Point](/datatypes/point/) | A geographical point |
| `polygon` | [Polygon](/datatypes/polygon/) | A geographical polygon |
| `string` | [String](/datatypes/string/) | A UTF-8 string |
| `text` | [Text](/datatypes/text/) | A Markdown text |
| `url` | [URL](/datatypes/url/) | A URL |


## Cardinality

**Cardinality** describes the number of elements in an unordered set. In the
Registers type system the cardinality can be either one (`1`) or many (`n`).

```elm
type Datatype
  = One Primitive
  | Many Primitive
```

| Identifier | Name | Description |
|-|-|-|
| `1` | One | A set of a single value |
| `n` | Many | A set of many values |

***
**NOTE:**

Cardinality is equivalent to list, array or set in other type systems.
***


