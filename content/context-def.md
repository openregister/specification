---
id: context-def
title: Context
url: /glossary/context
status: wip
---

***
ISSUE: Pending RFC for metadata
***

The **context** is the metadata snapshot that apply to a given log size.

```elm
type Schema =
  Set Attribute

type Stats =
  { totalEntries : Integer
  , totalRecords : Integer
  , totalBlobs : Integer
  }

type Context =
  { id : Name
  , title : Maybe String
  , copyright : String
  , custodian : Maybe String
  , description : Maybe String
  , hashingAlgorithm : HashingAlgorithm
  , licence : Maybe String
  , rootHash : Hash
  , schema : Schema
  , stats : Stats
  }
```
