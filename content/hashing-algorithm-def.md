---
id: hashing-algorithm-def
title: Hashing algorithm
url: /glossary/hashing-algorithm/
status: wip
---

***
ISSUE: [#26](https://github.com/openregister/registers-rfcs/pull/26) Define
how to identify hashing algorithms.
***

The **hashing algorithm** is the function used across the register to create a
fixed size digest for identifying and addressing [items](/glossary/item/),
[entry](/glossary/entry/) verification and for the [audit process](/audit/).

***
TODO: The definition below depends on the outcome of ISSUE#26.
***

```elm
type HAlgorithm =
  { label = "sha2-256"
  , functionType = 0x12
  , digestLength = 0x20
  }
```

If a register changes its hashing algorithm means effectively that a new
register has to be created with the same data and the same changes but with a
different integrity identity. A register implementation MAY provide ways to
map from the old identities to the new one (e.g. via HTTP redirection).

***
TODO:

Currently there is only one valid hashing algorithm, `sha-256`. In the future,
other alternative hashing algorithms MAY be added to this specification. They
will be distinguished by having a different string prefix.
***
