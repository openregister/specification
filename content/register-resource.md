---
id: register-resource
title: Register
url: /rest-api/register/
status: wip
---

***
### Endpoint

```
GET /register
```

### Response attributes

|Name|Type|Description|
|-|-|-|
|`domain`| [String](/datatypes/string/)|The Internet domain the register is available from.|
|`total-entries`| [Integer](/datatypes/integer/)|The number of entries in the log.|
|`total-records`| [Integer](/datatypes/Integer/)|The number of records in the register.|
|`register-record`| |A copy of the Register register Record resource entity describing this register.|
|`custodian`| Optional [String](/datatypes/string/)|The custodian of the register.|
|`last-updated`| [Timestamp](/datatypes/timestamp/)|The date the register was last updated.|

### Response summary

See the [generic codes](/rest-api#codes).

***

The register resource summarises the register statistics.

***
TODO: The `register-record` attribute doesn't show a full record, just the item
part of it.
***

***
**EXAMPLE:**

```http
GET /register HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "domain": "register.gov.uk",
  "total-records": 199,
  "total-entries": 208,
  "register-record": {
    "fields": [
      "country",
      "name",
      "official-name",
      "citizen-names",
      "start-date",
      "end-date"
    ],
    "registry": "foreign-commonwealth-office",
    "text": "British English names and descriptive terms for countries as recognised by the UK government",
    "phase": "beta",
    "register": "country"
  },
  "custodian": "**REDACTED**4b0d7e9f250bfe7844571bc1c1a4eb23294ac264cf0e27690cc043b0ac779ab6",
  "last-updated": "2018-06-13T13:54:40Z"
}
```
***
