---
id: entry-resource
title: Entries
url: /rest-api/entries
---

***
NOTE: See the [Entry](/glossary/entry) definition to understand how this
resource fits into the [data model](/data-model).
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
|`entry-number`| [Integer](/datatypes/integer)|The number of the [Entry](/glossary/entry).|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/datatypes/integer)|The [entry number](/glossary/entry#number).|
|`entry-timestamp`| [Timestamp](/datatypes/timestamp)|The [entry timestamp](/glossary/entry#timestamp).
|`key`| [ID](/glossary/key#id-type)|The [entry key](/glossary/entry#key).|
|`blob-hash`| [Hash](/datatypes/hash)|The [blob hash](/glossary/entry#blob-references).|
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

{
  "entry-number": 72,
  "entry-timestamp": "2016-04-05T13:23:05Z",
  "key": "GH",
  "blob-hash": "1220dc1d12943ea264de937468b254286e5ebd8acd316e21bf667076ebdb8c111bd1"
}
```
***

## List entries

***
### Endpoint

```
GET /entries
```
***

Gets the list of entries. [This resource MAY be paginated](/rest-api#collection-pagination).

The order MUST be by ascending entry number.

***
**NOTE:**

The reference implementation uses a `start` parameter to let users get the
collection of entries from a known entry number. The following examples use it
to illustrate pagination.
***

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
  ...

  {
    "entry-number": 98,
    "entry-timestamp": "2017-03-29T14:22:30Z",
    "key": "GM",
    "blob-hash":"12200429375c4fb403288ef816e5dd38a24f192e35b8f55e40cc6266eb25eaef77b1"
  },
  {
    "entry-number": 99,
    "entry-timestamp": "2017-10-25T09:52:52Z",
    "key": "CI",
    "blob-hash": "1220b3ca21b3b3a795ab9cd1d10f3d447947328406984f8a461b43d9b74b58cccfe8"
  },
  {
    "entry-number": 100,
    "entry-timestamp": "2018-06-13T13:54:40Z",
    "key": "SZ",
    "blob-hash": "1220f89f36ed8b2a1417237a8e95b810e8ab4ead844277ad7bc7794cb5f83732c976"
  }
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
    "entry-number": 101,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "KG",
    "blob-hash": "12208b748c574bf975990e47e69df040b47126d2a0a3895b31dce73988fba2ba27d8"
  },
  {
    "entry-number": 102,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "LA",
    "blob-hash": "1220490636974f8087e4518d222eba08851dd3e2b85095f2b1427ff6ecd3fa482435"
  },

  ...
]
```
***
