---
id: v1-item-resource
title: Items
url: /v1/rest-api/items
version: v1
---

***
NOTE: See the [Item](/v1/glossary/item) definition to understand how this
resource fits into the [data model](/v1/data-model).
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
|`item-hash`|[Hash](/v1/datatypes/hash)| The [Item](/v1/glossary/item) identifier.|
***

Gets an item by hash.

The column order is implementation dependent when the data is represented in a
tabular format like [CSV](/v1/rest-api#csv). For tree-like formats like
[JSON](/v1/rest-api#json), the object has to be treated as unordered.

To determine the set of attributes and their value types the user SHOULD use
the schema from the [Context resource](/v1/rest-api/context).

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

## List items

***
### Endpoint

```
GET /items
```
***

Gets the list of items. [This resource MAY be paginated](/v1/rest-api#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
NOTE: The [reference implementation](/v1/introduction#reference-implementation)
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
