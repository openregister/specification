---
id: key-def
title: Key
url: /glossary/key
---

A **key** is the identifier for an element in the dataset and thus, it MUST be
unique within a register. Each [entry](/glossary/entry#key) defines what is
the element affected through their key. Also, a [record](/glossary/record) is
identified by the key within the [snapshot](/glossary/snapshot).

A key MUST be of [type ID](#id-type).

```elm
key : ID
```

***
**EXAMPLE:**

For example, given the latest entry with key `DD`, the record:

```elm
Entry
  { number : 3
  , key: ID "DD"
  , timestamp : Timestamp (2016, 4, 5, 13, 23, 5, Utc)
  , item : [Hash::Sha256 "e1357671d0da24668952373d0cdf9f7659a1b155e45c8fb3c2f24331e46edc26"]
  }
```

And, given that the [blob](/glossary/blob) referenced from the record is:

```elm
Blob
  , ("start-date", "1949")
  , ("end-date", "1990-10-02")
  , ("official-name", "Germany Democratic Republic")
  , ("name", "East Germany")
  ]
```

The `Country` element for `DD` is:

```elm
Country
  { id : ID "DD"
  , startDate : Datetime 1949
  , endDate : Datetime 1990 10 2
  , officialName : "Germany Democratic Republic"
  , name : "East Germany"
  }
```
***

## ID type

An `ID` type is a subset of [String](/datatypes/string) as follows:

```abnf
id = (ALPHA / DIGIT) *(ALPHA / DIGIT / restricted)
restricted = delimiters / legacy
delimiters = "-" / "_" / "."
legacy = "/"
```

Where `restricted` MUST NOT appear consecutively (e.g `a____b`).

***
**NOTE:** The `/` (U+002F) character is discouraged as it needs to be encoded
as `%2F` in [CURIEs](/datatype/curie), one of the main use cases keys. It is
allowed due to legacy reasons.
***

***
**EXAMPLE:**

For example, the following identifiers are valid:

```
1
GB
01
10.5
ADR
CA-ZX
an_id
```

The following is discouraged but acceptable due legacy reasons:

```
10.2/3
```

The exaple above is encoded as a CURIE as:

```
example:10.2%2F3
```

And, assuming `example: https://www.example.org/` expanded as a URL as:

```
https://www.example.org/10.2%2F3
```

And the following are invalid:

```
_1
.34
A..B
ALPHA--
C__34
C_/34
```
***
