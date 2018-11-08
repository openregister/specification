---
id: v2-name-datatype
title: Name
url: /v2/datatypes/name
version: v2
---

The **name** datatype is a [String](/v2/datatypes/string) restricted to lower
case ASCII letters, digits and hyphens with the following pattern:

```abnf
name = ALPHA *(ALPHA / DIGIT / "-")
```

***
**EXAMPLE:**

For example, the following values are valid attribute names:

```
name
start-date
end-date
key-01
```

And the following are invalid:

```
0x
42-date
-boo
```
***
