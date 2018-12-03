---
id: v2-record-def
title: Record
url: /v2/glossary/record
version: v2
---

A **record** is the result of combining the key for an [entry](/v2/glossary/entry)
with the data from the blob.

```elm
type Record =
  { key : ID
  , data : Dict Name Value
  }
```

```elm
combine : BlobStore -> Entry -> Result Record UnknownBlob
```

***
**EXAMPLE:**

For example, the list of records part of the REST API can be computed by first
computing the latest [snapshot](/v2/glossary/snapshot) and then computing the
record for each entry:

```elm
map (combine store) (collect log)
```
***
