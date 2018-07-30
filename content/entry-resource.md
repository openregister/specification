---
id: entry-resource
title: Entries
url: /rest-api/entries/
status: wip
---

***
NOTE: See the [Entry](/glossary/entry/) definition to understand how this
resource fits into the [data model](/data-model/).
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
|`entry-number`| [Integer](/datatypes/integer/)|The number of the [Entry](/glossary/entry/).|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/datatypes/integer/)|The [entry number](/glossary/entry#number).|
|`entry-timestamp`| [Timestamp](/datatypes/timestamp/)|The [entry timestamp](/glossary/entry#timestamp).
|`key`| [Key](/datatypes/key/)|The [entry key](/glossary/entry#key).|
|`item-hash`| List of [Hash](/datatypes/hash/)|The list of [item hashes](/glossary/entry#item-references).|
|`index-entry-number`| [Integer](/datatypes/integer/)|The entry number [_experimental_].|
***

The entry resource returns an array containing a single entry.

***
TODO: Verify we can't revert back to a single entry (no array)
***

***
ISSUE: The ref impl returns numbers as String. Reasoning: the schema defines
the values for items, the types for structures part of registers are known in
advance and we can take advantage of capable serialisations like JSON.
***

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
|`start`| Optional [Integer](/datatypes/integer/)|Filters the collection starting at the given entry number.|
***

Gets the list of entries. [This resource MAY be paginated](/rest-api#collection-pagination).

The order MUST be by ascending entry number.

***
TODO: This makes `start` normative. Should this be a non-normative parameter?
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

Following the previous example, thi request gets the second page of the
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
