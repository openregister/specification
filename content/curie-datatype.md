---
id: curie-datatype
title: CURIE
url: /datatypes/curie/
---

A **CURIE** is inspired by the [CURIE Syntax 1.0](@curie) and essentially
compatible with it but with two key differences: Only a subset of CURIEs are
allowed and the reference follows [the URL specification](@url).

```elm
type Curie =
  Prefix (Maybe Reference)
```

The CURIE serialised as string is expressed in ABNF as:

```abnf
curie = prefix ":" [reference]
prefix = lowercase *(lowercase / DIGIT / "-" / "_")
reference = path-relative-scheme-less-url-string
lowercase = %x41-5A ; a-z
```

Where `path-relative-scheme-less-url-string` is defined by
https://url.spec.whatwg.org/#path-relative-scheme-less-url-string.


***
**EXAMPLE:**

For example, the following CURIEs are valid:

```
country:
country:GB
local-authority:ABC
example:foo/bar
example:/qux
```

And the following is invalid:

```
:GB
GB
country
```
***
