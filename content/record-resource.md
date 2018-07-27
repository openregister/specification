---
id: record-resource
title: Records
url: /resources/records/
status: wip
---

***
NOTE: See the [Record](/glossary/record/) definition to understand how this
resource fits into the [data model](/data-model/).
***


## Get a record

* Endpoint: `GET /records/{key}`
* Parameters:
  * `key`: (String) The record identifier.

Gets a record by key.

The set of fields and values when represented in a tabular format like CSV the
column order is implementation dependent. For representations like JSON, the
object has to be treated as unordered.

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
  "E09000019": {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000019",
    "item": [
        {
          "local-authority": "E09000019",
          "name": "Islington"
        }
    ]
  }
}
```
***

### HTTP headers

This resource SHOULD provide a [`Link:` header](@rfc8288) with a
`rel="version-history"` [[RFC5829](@rfc5829)] to the corresponding [Record
history](#list-the-history-for-a-record) for this record.


## List records

* Endpoint: `GET /records`

Gets the list of records. [This resource MAY be paginated](/resources#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
**EXAMPLE:**

```http
GET /records HTTP/1.1
Host: https://local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "E09000019": {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000019",
    "item": [
        {
          "local-authority": "E09000019",
          "name": "Islington"
        }
    ]
  },
  "E09000016": {
    "index-entry-number": "76",
    "entry-number": "76",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000016",
    "item": [
        {
          "local-authority": "E09000016",
          "name": "Havering"
        }
    ]
  }
}
```
***


## List the history for a record

* Endpoint: `GET /records/{key}/entries`

Get the list of [entries](/glossary/entry) with the record `key`. [This
resource MAY be paginated](/resources#collection-pagination).

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
    "index-entry-number": "90",
    "entry-number": "90",
    "entry-timestamp": "2016-04-05T13:23:05Z",
    "key": "CI",
    "item-hash": [
      "sha-256:7c16257bd45b4716914010b39dd40e5a6b985b8928d7b8bb0fe3005d2f2b0fec"
    ]
  },
  {
    "index-entry-number": "207",
    "entry-number": "207",
    "entry-timestamp": "2017-10-25T09:52:52Z",
    "key": "CI",
    "item-hash": [
      "sha-256:b3ca21b3b3a795ab9cd1d10f3d447947328406984f8a461b43d9b74b58cccfe8"
    ]
  }
]
```
***


## List records by field value

***
TODO: This endpoint path clashes with the regular get records. What about
`/facets/{field-name}/{field-value}`? It doesn't reflect that it is about
records but it removes any possible clash between `key` and `field-name`.

Or, `/records?fieldname={field-name}&value={field-value}` to be more honest about it.
After all, this is a filter on the original record list.
***

* Endpoint: `GET /records/{field-name}/{field-value}`

Gets the list of records filtered by the exact value of the given field name.
[This resource MAY be paginated](/resources#collection-pagination).

The order SHOULD be by consistent regardless of new elements being added to
the dataset.

***
**EXAMPLE:**

```http
GET /records/local-authority-type/CC HTTP/1.1
Host: local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "LND": {
    "index-entry-number": "355",
    "entry-number": "355",
    "entry-timestamp": "2016-10-31T12:59:03Z",
    "key": "LND",
    "item": [
      {
        "local-authority-type": "CC",
        "official-name": "City of London Corporation",
        "local-authority-eng": "LND",
        "name": "City of London",
        "start-date": "1905-06-28"
      }
    ]
  }
}
```
***
