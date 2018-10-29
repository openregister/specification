---
id: record-resource
title: Records
url: /rest-api/records
---

***
NOTE: See the [Record](/glossary/record) definition to understand how this
resource fits into the [data model](/data-model).
***

***
NOTE: The reference implementation inlines the [blob](/glossary/blob) in the
[Record resource](/rest-api/records) for convenience.
***

## Get a record

***
### Endpoint

```
GET /records/{key}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`key`| [ID](/glossary/key#id-type)|The record identifier.|
***

Gets a record by key.

The column order is implementation dependent when the data is represented in a
tabular format like [CSV](/rest-api#csv). For tree-like formats like
[JSON](/rest-api#json), the object has to be treated as unordered.

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
  "entry-number": 72,
  "entry-timestamp": "2015-08-20T08:15:30Z",
  "key": "E09000019",
  "blob": {
    "local-authority": "E09000019",
    "name": "Islington"
  }
}
```
***

### HTTP headers

This resource SHOULD provide a [`Link:` header](@rfc8288) with a
`rel="version-history"` [[RFC5829](@rfc5829)] to the corresponding [Record
trail](#list-the-trail-of-change-for-a-record) for this record.


## List records

***
### Endpoint

```
GET /records
```

### Query string parameters

|Name|Type|Description|
|-|-|-|
|`name`| [Name](/datatypes/name) |An attribute name part of the data. Required if `value` is present.|
|`value`| [String](/datatypes/string) |The string representation of a valid value for the `name`.|
***

Gets the list of records. [This resource MAY be paginated](/rest-api#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
**EXAMPLE:**

For example, a request for all records would look like:

```http
GET /records HTTP/1.1
Host: local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "entry-number": 72,
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000019",
    "blob": {
      "local-authority": "E09000019",
      "name": "Islington"
    }
  },
  {
    "entry-number": 76,
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000016",
    "blob": {
      "local-authority": "E09000016",
      "name": "Havering"
    }
  }
]
```
***

***
**EXAMPLE:**

For example, you can filter by value on the `local-authority-type` attribute:

```http
GET /records?name=local-authority-type&value=CC HTTP/1.1
Host: local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "entry-number": 355,
    "entry-timestamp": "2016-10-31T12:59:03Z",
    "key": "LND",
    "blob": {
      "local-authority-type": "CC",
      "official-name": "City of London Corporation",
      "local-authority-eng": "LND",
      "name": "City of London",
      "start-date": "1905-06-28"
    }
  }
]
```
***

## List the trail of change for a record

***
### Endpoint

```
GET /records/{key}/entries
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`key`| [ID](/glossary/key#id-type)|The record identifier.|
***

Get the list of [entries](/glossary/entry) with the record `key`. [This
resource MAY be paginated](/rest-api#collection-pagination).

The order MUST be by ascending entry number.

***
**EXAMPLE:**

```http
GET /records/CI/entries HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "entry-number": 90,
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "CI",
    "blob-hash": "12207c16257bd45b4716914010b39dd40e5a6b985b8928d7b8bb0fe3005d2f2b0fec"
  },
  {
    "entry-number": 207,
    "entry-timestamp": "2017-10-25T09:52:52Z",
    "key": "CI",
    "blob-hash": "1220b3ca21b3b3a795ab9cd1d10f3d447947328406984f8a461b43d9b74b58cccfe8"
  }
]
```
***
