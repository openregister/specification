---
id: context-resource
title: Context
url: /rest-api/context
version: v2
---

***
NOTE: See the [Context](/glossary/context) definition to understand how this
resource fits into the [data model](/data-model).
***

## Get the context

***
### Endpoint

```
GET /context
```

### Response attributes

|Name|Type|
|-|-|
|`id`| [Name](/datatypes/name) |
|`copyright`| [String](/datatypes/string) |
|`custodian`| Optional [String](/datatypes/string) |
|`description`| Optional [String](/datatypes/string) |
|`hashing-algorithm`| [HashingAlgorithm](#hashing-algorithm-attributes) |
|`licence`| [String](/datatypes/string) |
|`root-hash`| [Hash](/datatypes/hash) |
|`schema`| List of [attributes](#attribute-attributes) |
|`statistics`| [Statistics](#statistics-attributes) |
|`status`| [Status](#status-attributes) |
|`title`| Optional [String](/datatypes/string) |

#### Hashing algorithm attributes

|Name|Type|
|-|-|
|`digest-length`| [Integer](/datatypes/integer) |
|`function-type`| [Integer](/datatypes/integer) |
|`codec`| [String](/datatypes/string) |

#### Attribute attributes

|Name|Type|
|-|-|
|`id`| [Name](/datatypes/name) |
|`datatype`| [Datatype](/datatypes#primitives) |
|`cardinality`| [Cardinality](/datatypes#cardinality) |
|`title`| Optional [String](/datatypes/string) |
|`description`| Optional [String](/datatypes/string) |

#### Statistics attributes

|Name|Type|
|-|-|
|`total-entries`| [Integer](/datatypes/integer) |
|`total-blobs`| [Integer](/datatypes/integer) |
|`total-records`| [Integer](/datatypes/integer) |

#### Status attributes

|Name|Type|
|-|-|
|`start-date`| [Datetime](/datatypes/datetime) |
|`end-date`| Optional [Datetime](/datatypes/datetime) |
|`replacement`| Optional [Url](/datatypes/url) |
|`reason`| Optional [String](/datatypes/string) |

***

***
**EXAMPLE:**

For example,

```http
GET /context HTTP/1.1
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "multihash",
  "title": "The Multihash register",
  "description": "List of multihash codes.",
  "custodian": "IPFS team",
  "hashing-algorithm": {
    "codec": "sha2-256",
    "function-type": 18,
    "digest-length": 32
  },
  "statistics": {
    "total-entries": 0,
    "total-blobs": 0,
    "total-records": 0,
  },
  "copyright": "Copyright (c) 2016 Protocol Labs Inc.",
  "licence": "MIT",
  "root-hash": "1220e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "status": { "start-date": "2018-12" },
  "schema": [
    {"id": "name", "datatype": "name", "cardinality": "1"},
    {"id": "function-type", "datatype": "integer", "cardinality": "1"},
    {"id": "digest-length", "datatype": "integer", "cardinality": "1"}
  ]
}
```

***
