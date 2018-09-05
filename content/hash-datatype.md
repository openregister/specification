---
id: hash-datatype
title: Hash
url: /datatypes/hash
---

The **hash** datatype is the digest result of a [hashing
algorithm](/glossary/hashing-algorithm). The string representation MUST be in
hexadecimal and it MUST prepend the two bytes defined by the hashing
algorithm.

***
**EXAMPLE:**

For example, the SHA2-256 digest for `foo` represented in hexadecimal is:

```
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
```

And given that `SHA2-256` has the _function type_ `0x12` and the digest length
is `0x20` the final string representation is:

```
12202c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
```
***

***
**NOTE:**

The algorithm for [hashing items](/glossary/item#hash) and the one for [hashing
entries](/glossary/entry#hash) describe in detail how to apply the hashing
algorithm in each case.
***

