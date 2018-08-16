---
id: item-resource
title: Items
url: /rest-api/items/
status: wip
---

***
NOTE: See the [Item](/glossary/item/) definition to understand how this
resource fits into the [data model](/data-model/).
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
|`item-hash`|[Hash](/datatypes/hash/)| The [Item](/glossary/item/) identifier.|


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


### Success (200)

The payload MUST be in the requested [serialisation format](/rest-api#serialisation)
with the attributes defined by the [Schema](/glossary/schema/).

### Not Found (404)

A 404 MAY have a payload in the requested [serialisation
format](/rest-api#serialisation) with a helpful message.

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

This code MUST be used when the [data blob has been redacted](/redactable/).

***
ISSUE: Define the payload for this response. E.g.

```json
{
  "id": "sha-256:e94c4a9ab00d951dadde848ee2c9fe51628b22ff2e0a88bff4cca6e4e6086d7a",
  "status": "Redacted"
}
```
***

***
TODO: To determine the set of fields and their value types the user SHOULD use
the [Schema resource](/rest-api/schema/).
***

***
NOTE: The set of fields MAY be found in the catalogue as well. For example,
the GOV.UK catalogue is the [Register register](https://register.register.gov.uk/).
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
  "citizen-names":"Briton;British citizen"
}
```
***

### HTTP headers

A Item resource response SHOULD have an `ETag` header value with the item
[hash](/datatypes/hash/) to evidence items are immutable resources.

***
TODO: Consider how this suggestion plays with multiple serialisation based on
headers
***


## List items

***
### Endpoint

```
GET /items
```
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
