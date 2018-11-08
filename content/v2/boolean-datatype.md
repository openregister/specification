---
id: v2-boolean-datatype
title: Boolean
url: /v2/datatypes/boolean
version: v2
---

The **boolean** datatype can have two states:

```elm
type Boolean
  = True
  | False
```

The string representation is defined in ABNF as:

```abnf
boolean = "true" / "false"
```

***
**EXAMPLE:**

For example, in JSON:

```json
{"foo": "true", "bar": "false"}
```

And in CSV:

```csv
foo, bar
true, false
```
***
