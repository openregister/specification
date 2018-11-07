---
id: entry-resource
title: Entries
url: /rest-api/entries
version: v1
---

***
NOTE: See the [Entry](/v1/glossary/entry) definition to understand how this
resource fits into the [data model](/v1/data-model).
***

## Get an entry

***
### Endpoint

```
GET /entries/{entry-number}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/v1/datatypes/integer)|The number of the [Entry](/v1/glossary/entry).|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/v1/datatypes/integer)|The [entry number](/v1/glossary/entry#number).|
|`entry-timestamp`| [Timestamp](/v1/datatypes/timestamp)|The [entry timestamp](/v1/glossary/entry#timestamp).
|`key`| [ID](/v1/glossary/key#id-type)|The [entry key](/v1/glossary/entry#key).|
|`item-hash`| List of [Hash](/v1/datatypes/hash)|The list of [item hashes](/v1/glossary/entry#item-references).|
|`index-entry-number`| [Integer](/v1/datatypes/integer)|The entry number [_experimental_].|
***

The entry resource returns an array containing a single entry.

***
**EXAMPLE:**

The following example shows the request for an entry in JSON:

```http
GET /entries/72 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "index-entry-number": 72,
    "entry-number": 72,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "GH",
    "item-hash": [
      "sha-256:dc1d12943ea264de937468b254286e5ebd8acd316e21bf667076ebdb8c111bd1"
    ]
  }
]
```
***

## List entries

***
### Endpoint

```
GET /entries
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`start`| Optional [Integer](/v1/datatypes/integer)|Filters the collection starting at the given entry number.|
***

Gets the list of entries. [This resource MAY be paginated](/v1/rest-api#collection-pagination).

The order MUST be by ascending entry number.

***
**EXAMPLE:**

For example, the following request gets the first page of the entries
collection and links to the next page.

```http
GET /entries HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: </entries?start=101>; rel="next"

[
  {
    "index-entry-number": 1,
    "entry-number": 1,
    "entry-timestamp": "2015-08-15T08:15:30Z",
    "key": "402019",
    "item-hash": [
        "sha-256:1a0212ba5094383bcc2a0bbe1a55e3a1f1278984"
    ]
  },
  {
    "index-entry-number": 2,
    "entry-number": 2,
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "402020",
    "item-hash": [
        "sha-256:13f6de75b9f6d970691985e72a7dfa211bad1591"
    ]
  },
  {
    "index-entry-number": 3,
    "entry-number": 3,
    "entry-timestamp": "2015-08-21T00:00:00Z",
    "key": "402020",
    "item-hash": [
        "sha-256:13f6de75b9f6d970691985e72a7dfa211ba00000"
    ]
  },

  ...

]
```
***

***
**EXAMPLE:**

Following the previous example, this request gets the second page of the
entries collection and links to the next page.

```http
GET /entries?start=101 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: </entries?start=201>; rel="next", </entries?start=1>; rel="previous"


[
  {
    "index-entry-number": 101,
    "entry-number": 101,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "KG",
    "item-hash": [
      "sha-256:8b748c574bf975990e47e69df040b47126d2a0a3895b31dce73988fba2ba27d8"
    ]
  },
  {
    "index-entry-number": 102,
    "entry-number": 102,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "LA",
    "item-hash": [
      "sha-256:490636974f8087e4518d222eba08851dd3e2b85095f2b1427ff6ecd3fa482435"
    ]
  },

  ...
]
```
***
