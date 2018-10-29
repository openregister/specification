---
id: boolean-datatype
title: Boolean
url: /datatypes/boolean
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
