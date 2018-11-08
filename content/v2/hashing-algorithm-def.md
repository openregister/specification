---
id: v2-hashing-algorithm-def
title: Hashing algorithm
url: /v2/glossary/hashing-algorithm
version: v2
---

The **hashing algorithm** is the function used across the register to create a
fixed size digest for identifying and addressing [blobs](/glossary/blob),
[entry](/glossary/entry) verification and for the [audit process](/data-model/audit).

```elm
type HashingAlgorithm =
  { codec : String
  , functionType : UVarInt
  , digestLength : UInt
  }

```

In practice, if a register changes its hashing algorithm, it means that a new
register has to be created with the same data and the same changes but with a
different integrity identity. A register implementation MAY provide ways to
map from the old identities to the new one (e.g. via HTTP redirection).

Each hash in a Register MUST use [Multihash](@multihash) to identify the
function and length used.

## List of codes

The list of [Multihash](@multihash) codes can be found here:
https://github.com/multiformats/multihash/blob/master/hashtable.csv.

For convenience, the following table highlights some that are relevant for
Registers.

|Codec|Function type|Length|
|-|-|-|
|sha2-256|0x12|0x20|
|sha2-512|0x13|0x40|
|sha3-256|0x16|0x20|
|blake2b-256|0xb220|0x20|
|blake2b-512|0xb240|0x40|


***
NOTE: Check the [Multicodec](https://github.com/multiformats/multicodec)
project as well for more context on how multihash codes are maintained.
***

***
**EXAMPLE:**

For example, the hashing algorithm definition for SHA2-256 would be:

```elm
{ codec = "sha2-256"
, functionType = 0x12
, digestLength = 0x20
}
```
***
