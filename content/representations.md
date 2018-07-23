---
id: representations
title: Representations
url: /representations/
status: wip
---

JSON is the canonical representation but CSV is encouraged to be implemented
as well.

## JSON representation

* suffix: .json
* media-type: application/json
* specification: [JSON](@rfc8259)

All field values MUST be encoded as JSON strings. When JSON needs to be in a
canonical format, use the procedure defined in the [hash
datatype](/datatypes/hash-datatype/).

***
NOTE: JSON can have missing fields. These have the same semantics as a field
with a `null` value.
***

***
TODO: What's the meaning of an empty string? And an empty array when
cardinality n?
***


## CSV representation

* Suffix: .csv
* media-type: text/csv
* Specification: [Tabular data model](@tabular-data-model)

***
NOTE: CSV can have empty (blank) values. These have the same semantics as if
the fields were missing. See [#json-representation].
***

***
TODO: How does the tabular data model interop with the R data types?
***
