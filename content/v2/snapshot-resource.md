---
id: v2-snapshot-resource
title: Snapshots
url: /v2/rest-api/snapshots
version: v2
status: exp
---

***
NOTE: See the [Snapshot](/v2/glossary/snapshot) definition to understand how this
resource fits into the [data model](/v2/data-model).
***

## Get a snapshot

***
### Endpoint

```
GET /snapshots/{log-size}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`log-size`|[Integer](/v2/datatypes/integer)|The log size to compute the snapshot.|
***

Gets a snapshot by log size.

***
**EXAMPLE:**

```http
GET /records/E09000019 HTTP/1.1
Host: local-authority.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: </records/E09000019/entries>; rel="version-history"

{
  "_id": "E09000019",
  "name": "Islington"
}
```
***

### HTTP headers

This resource SHOULD provide a [`Link:` header](@rfc8288) with a
`rel="version-history"` [[RFC5829](@rfc5829)] to the corresponding [Record
trail](#list-the-trail-of-change-for-a-record) for this record.


## Get a snapshot entry by key

***
### Endpoint

```
GET /snapshots/{log-size}/{key}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`log-size`|Integer|The log size to compute the snapshot.|
|`key`|[ID](/v2/glossary/key#id-type)|The unique identifier for an element of the register.|
***

Returns an entry resource.

***
**EXAMPLE:**

For example, a request for all records would look like:

```http
GET /snapshots/6/GB HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "entry-number": 6,
  "entry-timestamp": "2016-04-05T13:23:05Z",
  "key": "GB",
  "blob-hash": "12206b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb"
}
```
***
