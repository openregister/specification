---
id: v2-datatypes
title: Datatypes
url: /v2/datatypes
version: v2
---

## Primitives

A primitive **datatype** defines a set of rules and expectations for a value
in a [blob of data](/v2/glossary/blob).

```elm
type Primitive
  = Curie
  | Datetime
  | Name
  ...
```

The table below lists the identifiers for each available primitive datatype.
These identifiers are used by the schema part of the [Context
resource](/v2/rest-api/context).

| Identifier | Name | Description |
|-|-|-|
| `boolean` | [Boolean](/v2/datatypes/boolean) | Either true or false |
| `curie` | [CURIE](/v2/datatypes/curie) | A Link between registers |
| `datetime` | [Datetime](/v2/datatypes/datetime) | A date with flexible accuracy |
| `name` | [Name](/v2/datatypes/name) | A restricted string suitable for identifiers or attribute names |
| `hash` | [Hash](/v2/datatypes/hash) | A hashing algorithm digest |
| `integer` | [Integer](/v2/datatypes/integer) | A base 10 number |
| `period` | [Period](/v2/datatypes/period) | A period of time |
| `string` | [String](/v2/datatypes/string) | A UTF-8 string |
| `text` | [Text](/v2/datatypes/text) | A Markdown text |
| `timestamp` | [Timestamp](/v2/datatypes/timestamp) | A point in time in UTC. |
| `url` | [URL](/v2/datatypes/url) | A URL |


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
