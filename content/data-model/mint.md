---
id: mint
title: Mint
url: /data-model/mint
status: wip
---

**Minting** is the process of validating a potential change for a key and
creating a new [entry](/glossary/entry) that can be appended to the
[log](/glossary/log).

```elm
type Draft =
  { key : Name
  , blob : Item
  }

mint : Draft -> Result ValidationError (Entry, Item)

append : Entry -> Log -> Log
```

## Validation

A `Draft` is valid iff:

* Provides a valid `key` ([Name](/datatypes/name)).
* The [data blob is valid](/glossary/item#validate).
