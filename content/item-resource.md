---
id: item-resource
title: Items
url: /resources/items/
status: wip
---

***
NOTE: See the [Item](/glossary/item/) definition to understand how this
resource fits into the [data model](/data-model/).
***


## Get an item

* Endpoint: `GET /items/{item-hash}`
* Parameters:
  * `item-hash`: The identifier for the [Item](/glossary/item/).

Gets an item by hash.

The set of fields and values when represented in a tabular format like CSV the
column order is implementation dependent. For representations like JSON, the
object has to be treated as unordered.

***
TODO: To determine the set of fields and their value types the user SHOULD use
the [Schema resource](/resources/schema/).
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

* Endpoint: `GET /items`

Gets the list of items. [This resource MAY be paginated](/resources#collection-pagination).

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
