---
id: v2-context-def
title: Context
url: /v2/glossary/context
version: v2
---

The **context** is the metadata snapshot that apply to a given log size.

```elm
type Context =
  { id : Name
  , copyright : Maybe String
  , custodian : Maybe String
  , description : Maybe String
  , hashingAlgorithm : HashingAlgorithm
  , licence : Maybe String
  , rootHash : Hash
  , schema : Schema
  , statistics : Statistics
  , status : Status
  , title : Maybe String
  }
```

## Attributes

### Id

* Type: [Name](/v2/datatypes/name)

The register identifier.

### Copyright

* Type: Optional [String](/v2/datatypes/string)

The register copyright. E.g. `© Crown copyright`. A register SHOULD have
an explicit copyright.

### Custodian

* Type: Optional [String](/v2/datatypes/string)

The data owner. A register SHOULD have an explicit owner.

### Description

* Type: Optional [String](/v2/datatypes/string)

The human readable description of the register.

### Hashing algorithm

* Type: HashingAlgorithm

The [hashing algorithm](/v2/glossary/hashing-algorithm) for the register.

### Licence

* Type: Optional [String](/v2/datatypes/string)

The licence the data is released under. A register SHOULD have an explicit
licence to ensure users know under what terms they can use the data.

### Root hash

* Type: [Hash](/v2/datatypes/hash)

The [root hash](/v2/glossary/digital-proof#root-hash) for the register.

### Schema

* Type: [Schema](/v2/glosasry/schema)

The set of attributes that define the data allowed in the register.

### Statistics

* Type: Statistics

The summary of objects stored in the register.

```elm
type Statistics =
  { totalEntries : Integer
  , totalRecords : Integer
  , totalBlobs : Integer
  }
```

### Status

* Type: Status

The status of the register. Either active or retired.

```elm
type Status
  = Active { startDate : Timestamp }
  | Retired { startDate : Timestamp
            , endDate : Timestamp
            , replacement : Maybe Url
            , reason : Text
            }
```

### Title

* Type: Optional [String](/v2/datatypes/string)

The human readable name of the register.
