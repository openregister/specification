---
id: hash-datatype
title: Hash datatype
url: /datatypes/hash/
status: wip
---

### Hash datatype

A hexadecimal string representing the result of a hashing algorithm such as
SHA2-256.

Currently there is only one valid hashing algorithm, `sha-256`. In the future,
other alternative hashing algorithms MAY be added to this specification.
They will be distinguished by having a different string prefix.

***
TODO: Distinguish between hash, hash datatype and canonicalisation
***

The `sha-256` hash is computed by serialising the item to a canonical form of
JSON, and computing the SHA-256 hash, defined in the [Secure Hash
Standard](@fips-180-4), of the resulting serial form.

## Canonicalisation

The canonicalisation algorithm is as follows:

* JSON object values MUST be sorted into lexicographical order. The keys of a
  JSON object must be a valid field name, which is restricted to the alphabet
  of lower case letters and hyphens, which makes this ordering relatively
  simple to implement.
* All whitespace MUST be removed.
* Characters in strings must be represented as follows:
  * For ASCII control characters (codepoints `0x00 - 0x1f`):
    * If it has a short representation (`\b`, `\f`, `\n`, `\r`, or `\t`), that
      short representation MUST be used.
    * Other control characters (such as `NULL`) MUST be represented as a
      `\u00XX` escape sequence. Hexadecimal digits MUST be upper-case.
  * Backslash (`\`) and double quote (`"`) MUST be escaped as `\\` and `\"`
    respectively.
  * All other characters MUST be included literally (ie unescaped). This
    includes forward-slash (`/`).


***
**EXAMPLE:**

For example, take an item with two fields `foo` and `bar` with values `abc`
and `xyz` respectively. This can be expressed as JSON:

```json
{
  "foo": "abc",
  "bar": "xyz"
}
```

This can then be canonicalised

```json
{"bar":"xyz","foo":"abc"}
```

Then hashed with SHA-256

```shell
$ echo -n '{"bar":"xyz","foo":"abc"}' | shasum -a 256
5dd4fe3b0de91882dae86b223ca531b5c8f2335d9ee3fd0ab18dfdc2871d0c61
```

And finally prepended with the hashing algorithm:

```
+sha-256:5dd4fe3b0de91882dae86b223ca531b5c8f2335d9ee3fd0ab18dfdc2871d0c61
```
***
