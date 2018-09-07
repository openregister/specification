---
id: mint
title: Mint
url: /data-model/mint
status: wip
---

**Minting** is the process of timestamping an entry and appending it to the log.

***
TODO: What else is required in order to define this concept? Given that the
spec is read-only, is minting still a thing?

What's the role of validation? and number assignment?
***

***
TODO: Find a better name for  `Draft`.
***

```elm
type Draft =
  { key : Name
  , blob : Item
  }
```

```elm
mint : Draft -> Result ValidationError (Entry, Item)
```

## Validation

A `Draft` is valid iff:

* Provides a valid `key` (Name).
* The [data blob is valid](/glossary/item#validate).


Note: RSF rules are not part of the data model. But we can provide a
non-normative note explaining other checks done in ref impl.
