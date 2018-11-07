---
id: datatypes
title: Datatypes
url: /datatypes
version: v2
---

## Primitives

A primitive **datatype** defines a set of rules and expectations for a value
in a [blob of data](/glossary/blob).

```elm
type Primitive
  = Curie
  | Datetime
  | Name
  ...
```

The table below lists the identifiers for each available primitive datatype.
These identifiers are used by the schema part of the [Context
resource](/rest-api/context).

| Identifier | Name | Description |
|-|-|-|
| `curie` | [CURIE](/datatypes/curie) | A Link between registers |
| `datetime` | [Datetime](/datatypes/datetime) | A date with flexible accuracy |
| `name` | [Name](/datatypes/name) | A restricted string suitable for identifiers or attribute names |
| `hash` | [Hash](/datatypes/hash) | A hashing algorithm digest |
| `integer` | [Integer](/datatypes/integer) | A base 10 number |
| `period` | [Period](/datatypes/period) | A period of time |
| `string` | [String](/datatypes/string) | A UTF-8 string |
| `text` | [Text](/datatypes/text) | A Markdown text |
| `url` | [URL](/datatypes/url) | A URL |


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
