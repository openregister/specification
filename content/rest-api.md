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

## Pagination

Collections MUST offer pagination through the [`Link` header](@rfc8288).
Use a `rel="next"` to link to the next page. You MAY offer a previous page
link with `rel="previous"` if you expect iterating backwards.

## Codes

Each resource defines the codes with specific meaning in their context. The
list below describes the most important ones with generic meaning. You SHOULD
use other codes when necessary as long as they don't collide with the ones
defined in this specification.

|Code|Status|Description|
|-|-|-|
|200|Success|The resource exists and has been delivered.|
|301|Moved Permanently|The resource exists but it has a new permanent location.|
|404|Not Found|The resource doesn't exist.|
|405|Method Not Allowed|The request method is not allowed.|
|406|Not Acceptable|The format requested is not available.|
|500|Internal Server Error|Generic server error.|

The payload MUST be in the requested [serialisation format](#serialisation).

A 404 MAY have a payload with a helpful message.


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

JSON can have missing fields. These have the same semantics as a field
with a `null` value or an empty string or empty array.
See the [forward compatibility section](/evolve#forwards-compatibility).

### CSV

* Suffix: `.csv`
* Content type: `text/csv`
* Reference: [Tabular data model](@tabular-data-model)

CSV can have empty (blank) values. These have the same semantics as if
the fields were missing.
See the [forward compatibility section](/evolve#forwards-compatibility).

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


## Security

_This section is non-normative._

A register should only be available over HTTPS and it should redirect from
HTTP to HTTPS.

Registers aim to be auditable and tustworthy data sources. Any mechanism that
helps minimise attacks able to compromise the integritiy of the data in
transit or at rest should be considered favourably.

***
NOTE: You should consider enabling [HTTP Strict Transport Security](@rfc6797)
and use [Content Security Policy Level 2](@csp2) when appropriate.
***
