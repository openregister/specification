---
id: curie-datatype
title: CURIE
url: /datatypes/curie
version: v1
---

***
NOTE: The intention of the CURIE datatype is to provide Registers with a
mechanism to [link between them](/v1/data-model#link).
***

A **CURIE** (Compact URL) is inspired by the [CURIE Syntax 1.0](@curie) and
essentially compatible with it. There are two key differences: only a subset
of CURIEs are allowed and that the reference part complies with [the URL
specification](@url) instead of the URL/URI/IRI IETF specifications.

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

And the following are invalid:

```
:GB
GB
country
```
***

## Expansion to URL

To expand a CURIE into a URL, you need a prefix mapping typically found in the
[catalogue](/v1/glossary/catalogue).

The mapping base URL MUST BE be a valid [Record endpoint](/v1/rest-api/records#get-a-record).

```elm
expand : Curie -> Mapping -> Maybe URL
```

The algorithm:

1. let _curie_ be the CURIE to exand.
1. let _mapping_ be a pair (_prefix_, _base-url_).
1. let _url_ be null.
1. Parse the _curie_ into its parts: _curie-prefix_ and _reference_.
1. If _curie-prefix_ equals _prefix_:
   1. Set _url_ with the result of joining _base-url_ with _reference_.

   Otherwise terminate.


***
**EXAMPLE:**

For example, a successful expansion for `country:GB` could look like:

```elm
curie = Curie "country" (Just "GB") -- Parsed from "country:GB"
mapping = ("country", "https://country.register.gov.uk/records/")

url = expand curie mapping

url == Just "https://country.register.gov.uk/records/GB"
```

When the reference part of the Curie is empty the process is the same. For
example, given a CURIE `country:`

```elm
curie = Curie "country" Nothing -- Parsed from "country:"
mapping = ("country", "https://country.register.gov.uk/records/")

url = expand curie mapping

url == Just "https://country.register.gov.uk/records/"
```

When the prefixes in the mapping and the CURIE don't match, the result is a
failure. For example, a failed expansion for `country:GB` could look like:

```elm
curie = Curie "country" "GB" -- Parsed from "country:GB"
mapping = ("example", "https://example.org/")

url = expand curie mapping

url == Nothing
```
***
