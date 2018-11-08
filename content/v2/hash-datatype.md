---
id: v2-hash-datatype
title: Hash
url: /v2/datatypes/hash
version: v2
---

The **hash** datatype represents the digest result of a [hashing
algorithm](/v2/glossary/hashing-algorithm).

```elm
type Hash =
  {
  , functionType : UVarInt
  , digestLength : UInt
  , digest : List Byte
  }
```


The string representation MUST be in hexadecimal and it MUST prepend the
function type and digest length defined by the hashing algorithm according to
the [multihash](https://multiformats.io/multihash/) pattern:

```
<functionType><digestLength><digest>
```

***
**EXAMPLE:**

For example, the SHA2-256 digest for `foo` represented in hexadecimal is:

```
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
```

And given that `SHA2-256` has the _function type_ `0x12` and the _digest length_
is `0x20` the final string representation is:

```
12202c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
```
***

***
**NOTE:**

The algorithm for [hashing blobs](/v2/glossary/blob#hash) and the one for [hashing
entries](/v2/glossary/entry#hash) describe in detail how to apply the hashing
algorithm in each case.
***

