---
id: v2-blob-resource
title: Blobs
url: /v2/rest-api/blobs
version: v2
---

***
NOTE: See the [Blob](/v2/glossary/blob) definition to understand how this
resource fits into the [data model](/v2/data-model).
***


## Get an blob

***
### Endpoint

```
GET /blobs/{hash}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`hash`|[Hash](/v2/datatypes/hash)| The [Blob](/v2/glossary/blob) identifier.|
***

Gets an blob by hash.

The column order is implementation dependent when the data is represented in a
tabular format like [CSV](/v2/rest-api#csv). For tree-like formats like
[JSON](/v2/rest-api#json), the object has to be treated as unordered.

To determine the set of attributes and their value types the user SHOULD use
the schema from the [Context resource](/v2/rest-api/context).

***
NOTE: The set of attributes MAY be found in the catalogue as well. For example,
the GOV.UK catalogue is the [Register register](https://register.register.gov.uk).
***


***
**EXAMPLE:**

For example, the following request shows a blob in the JSON representation:

```http

GET /blobs/12206b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb HTTP/1.1
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


## List blobs

***
### Endpoint

```
GET /blobs
```
***

Gets the list of blobs. [This resource MAY be paginated](/v2/rest-api#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
NOTE: The [reference implementation](/introduction#reference-implementation)
gives a numeric index to each blob when they are inserted to the database so
complete pages always return the same set of blobs and incomplete pages grow
in an ordered manner.
***

***
**EXAMPLE:**

```http
GET /blobs HTTP/1.1
Host: local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: </blobs?cursor=2112>; rel="next"

{
  "12206a048d58e944ce2430256d04de09fc70a5c0ff08f08569a7fd5cb96dc559d7cb": {
    "local-authority-eng": "CAB",
    "name": "Cambridge"
  },
  "1220d87a75d2333ceaf0e308380ddc0de9fa47eb969413d917f934ee9c9cb31caadd": {
    "local-authority": "NMD",
    "name": "Wycombe"
  }
}
```
***
