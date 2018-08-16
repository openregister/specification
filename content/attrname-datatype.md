---
id: attrname-datatype
title: Attribute Name
url: /datatypes/attrname/
---

An **attribute name** is a [String](/datatypes/string/) restricted to lower
case ASCII letters, digits and hyphens with the following pattern:

```abnf
attrname = ALPHA *(ALPHA / DIGIT / "-")
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
