---
id: rest-api
title: REST API
url: /rest-api/
status: wip
---

***
TODO: Describe the goal of this REST API and generic stuff. Perhaps consider
OpenAPI
***

## Collection pagination

Collections MUST offer pagination through the [`Link` header](@rfc8288).
Use a `rel="next"` to link to the next page. You MAY offer a previous page
link with `rel="previous"` if you expect iterating backwards.

## Serialisation

There are two mechanisms to declare the preferred serialisation format: the
`Accept` header or the suffix. When both are provided the suffix MUST take
preference. When none are provided, JSON MUST be the fallback serialisation
format.

JSON is the canonical serialisation format but CSV is encouraged to be
implemented as well.

Some resources like the [Archive](/rest-api/archive/) use different content
types. The resource definition explain its particularities.

### JSON

* Suffix: `.json`
* Content type: `application/json`
* Reference: [JSON](@rfc8259)

All field values MUST be encoded as JSON strings. When JSON needs to be in a
canonical form, use the procedure defined in the [hash
datatype](/datatypes/hash/).

***
NOTE: JSON can have missing fields. These have the same semantics as a field
with a `null` value.
***

***
TODO: What's the meaning of an empty string? And an empty array when
cardinality n?
***

### CSV

* Suffix: `.csv`
* Content type: `text/csv`
* Reference: [Tabular data model](@tabular-data-model)

***
NOTE: CSV can have empty (blank) values. These have the same semantics as if
the fields were missing. See [JSON](#json).
***

***
ISSUE: How does the tabular data model interop with the Register data types?
***

### Extensions

A register MAY provide additional, possibly domain specific representations.

A register containing fields with [Point datatype](/datatypes/point/) or
[Polygon datatype](/datatypes/polygon/) values may also serve a list of items
as [GML](@gml), [KML](@kml) or other geographical serialisation format.

***
TODO: Example with RSF
***


