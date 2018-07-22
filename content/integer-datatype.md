---
id: integer-datatype
title: Integer datatype
url: /datatypes/integer/
status: wip
---

### Integer datatype

A decimal number with no fractional component.

```abnf
integer = "0" / (["-"] non-zero *digit)
digit =  "0" / positive-digit
non-zero =  "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
```

Leading zeros are not allowed, except for the integer `0`, which is
represented as the string `“0”`. Negative values are marked with a leading “-”
character (<a data-link-type="biblio" href="#biblio-unicode">[UNICODE]</a>
`0x2D` HYPHEN-MINUS).

---
**Example**

The following examples are all valid integer values:

```
100
0
-200
```

---

