---
id: v2-string-datatype
title: String
url: /v2/datatypes/string
version: v2
---

The **string** datatype is a sequence of one or more [Unicode](@unicode)
characters. It MUST be encoded as [UTF-8](@rfc3629).

The empty string SHOULD NOT be allowed as a valid string to avoid any ambiguous
meaning when serialising or deserialising from less-expressive formats like
[CSV](/v2/rest-api#serialisation).

It is advised to reject as well any string with no printable characters.

Finally, a string MUST NOT have a [Byte Order
Mark](https://en.wikipedia.org/wiki/Byte_order_mark).
