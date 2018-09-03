---
id: item-resource
title: Items
url: /rest-api/items
status: wip
---

***
NOTE: See the [Item](/glossary/item) definition to understand how this
resource fits into the [data model](/data-model).
***


## Get an item

***
### Endpoint

```
GET /items/{item-hash}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`item-hash`|[Hash](/datatypes/hash)| The [Item](/glossary/item) identifier.|


### Response summary

|Code|Status|Description|
|-|-|-|
|[200](#success-200)|Success|The requested item exists and has been delivered.|
|[404](#not-found-404)|Not Found|The requested item doesn't exist.|
|[410](#gone-410)|Gone|The requested item is no longer available. It was redacted.|

See the [generic codes](/rest-api#codes) for more.

***

Gets an item by hash.

The column order is implementation dependent when the data is represented in a
tabular format like [CSV](/rest-api#csv). For tree-like formats like
[JSON](/rest-api#json), the object has to be treated as unordered.

To determine the set of attributes and their value types the user SHOULD use
the schema from the [Context resource](/rest-api/context).

***
NOTE: The set of attributes MAY be found in the catalogue as well. For example,
the GOV.UK catalogue is the [Register register](https://register.register.gov.uk).
***


***
**EXAMPLE:**

For example, the following request shows an item in the JSON representation:

```http

GET /items/sha-256:6b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156

{
  "country":"GB",
  "official-name":"The United Kingdom of Great Britain and Northern Ireland",
  "name":"United Kingdom",
  "citizen-names":["Briton","British citizen"]
}
```
***


### Success (200)

The payload MUST be in the requested [serialisation
format](/rest-api#serialisation) , when available, with the attributes defined
by the [Schema](/glossary/schema).

### Not Found (404)

A 404 MAY have a payload in the requested [serialisation
format](/rest-api#serialisation) with a helpful message.

The payload MUST be in the requested [serialisation format](/rest-api#serialisation)
when available.

***
**EXAMPLE:**

For example,

```http
GET /items/foo HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "The requested item doesn't exist. The list of items may be of help.",
  "items-url": "/items"
}
```
***

### Gone (410)

This code MUST be used when the [data blob has been redacted](/data-model/redact).

***
ISSUE: Pending approval of [RFC0017](https://github.com/openregister/registers-rfcs/pull/30)
***


***
**EXAMPLE:**

For example,

```http
GET /items/sha-256:6b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 410 Gone
Content-Type: application/json

**REDACTED**sha-256:6b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb
```

For tabular data such as CSV, the payload MUST be the same as the expected
list of attributes doesn't apply:

```http
GET /items/12206b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb HTTP/1.1
Host: country.register.gov.uk
Accept: text/csv;charset=UTF-8
```

```http
HTTP/1.1 410 Gone
Content-Type: text/csv;charset=UTF-8

**REDACTED**12206b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb
```
***


## List items

***
### Endpoint

```
GET /items
```

### Response summary

|Code|Status|Description|
|-|-|-|
|200|Success|The requested page exists and has been delivered.|
|404|Not Found|The requested page doesn't exist.|

See the [generic codes](/rest-api#codes) for more.
***

Gets the list of items. [This resource MAY be paginated](/rest-api#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
NOTE: The [reference implementation](/introduction#reference-implementation)
gives a numeric index to each item when they are inserted to the database so
complete pages always return the same set of items and incomplete pages grow
in an ordered manner.
***

***
**EXAMPLE:**

```http
GET /items HTTP/1.1
Host: local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: </items?cursor=2112>; rel="next"

{
  "sha-256:1a0212ba5094383bcc2a0bbe1a55e3a1f1278984": {
    "local-authority": "E09000019",
    "name": "Islington"
  },
  "sha-256:d9178efd8febfebaaa42968648b7bdd023369c7f": {
    "local-authority": "E09000016",
    "name": "Havering"
  }
}
```
***
