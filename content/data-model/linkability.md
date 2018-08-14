---
id: linkability
title: Linkability
url: /linkability/
status: wip
---

The mechanism for linking two elements is the [CURIE datatype](/datatypes/curie/).
It allows linking between registers defined in the same [catalogue](/glossary/catalogue/).

The catalogue serves as the lookup table for prefix mappings. Given a CURIE
prefix, the catalogue should return its base URL such that the user could
perform [the expansion to a URL](/datatypes/curie#expansion-to-url).

***
**EXAMPLE:**

For example, a link to the country of birth could be expressed as:

```elm
[ ("name": "Alan Turing")
, ("born-in": "country:GB")
]
```

Or a link of an allergen to its group which is part of the same dataset:

```elm
[ ("name": "Walnut")
, ("group": "allergen:24")
]
```
***
