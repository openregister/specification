---
id: v1-datatypes
title: Datatypes
url: /v1/datatypes
version: v1
---

## Primitives

A primitive **datatype** defines a set of rules and expectations for a value
in a [blob of data](/v1/glossary/item).

```elm
type Primitive
  = Curie
  | Datetime
  | Name
  ...
```

The table below lists the identifiers for each available primitive datatype.

| Identifier | Name | Description |
|-|-|-|
| `curie` | [CURIE](/v1/datatypes/curie) | A Link between registers |
| `datetime` | [Datetime](/v1/datatypes/datetime) | A date with flexible accuracy |
| `name` | [Name](/v1/datatypes/name) | A restricted string suitable for identifiers or attribute names |
| `hash` | [Hash](/v1/datatypes/hash) | A hashing algorithm digest |
| `integer` | [Integer](/v1/datatypes/integer) | A base 10 number |
| `period` | [Period](/v1/datatypes/period) | A period of time |
| `string` | [String](/v1/datatypes/string) | A UTF-8 string |
| `text` | [Text](/v1/datatypes/text) | A Markdown text |
| `url` | [URL](/v1/datatypes/url) | A URL |


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
