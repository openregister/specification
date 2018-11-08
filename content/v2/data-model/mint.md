---
id: v2-mint
title: Mint
url: /v2/data-model/mint
version: v2
---

**Minting** is the process of creating a new [entry](/glossary/entry) for a
given key. The minting process MAY fail if the entry and
[blob](/glossary/blob) do not comply with the requirements.

The **draft** data to be minted can be defined as:

```elm
type Draft =
  { key : Name
  , blob : Blob
  }
```

And the `mint` operation as:

```elm
mint : Draft -> Result ValidationError (Entry, Blob)
```

## Validation

A `Draft` is valid if and only if:

* Provides a valid `key` ([Name](/datatypes/name)).
* The [data blob is valid](/glossary/blob#validate).
