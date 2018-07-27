---
id: hash-datatype
title: Hash
url: /datatypes/hash/
status: wip
---

A hexadecimal string representing the result of a hashing algorithm such as
SHA2-256.

Currently there is only one valid hashing algorithm, `sha-256`. In the future,
other alternative hashing algorithms MAY be added to this specification. They
will be distinguished by having a different string prefix.

***
TODO: Distinguish between hash, hash datatype and canonicalisation
***

The `sha-256` hash is computed by serialising the item to a canonical form of
JSON, and computing the SHA-256 hash, defined in the [Secure Hash
Standard](@fips-180-4), of the resulting serial form.
