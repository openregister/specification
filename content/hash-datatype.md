### Hash datatype

A hexadecimal string representing the result of a hashing algorithm such as
SHA2-256.

* A hash of the item’s contents may be used to identify the contents of an item, irrespective of where it is stored or presented.
* An item-hash is a hashing algorithm and a hash value, separated by a colon (:) character.  Currently there is only one valid hashing algorithm, `sha-256`. In future, other alternative hashing algorithms may be added to this specification.  They will be distinguished by having a different string prefix.

#### SHA-256 item hash

---
**Example**

The SHA-256 item hash of the item with a field `field1` with a value of `"a"` and a field <code>field2</code> with a value of <code>"b"</code> is:

```
sha-256:129332749e67eb9ab7390d7da2e88173367d001ac3e9e39f06e41690cd05e3ae
```

The <code>sha-256</code> item hash is computed by serialising the item to a canonical form of JSON, and computing the SHA-256 hash, defined in <a data-link-type="biblio" href="#biblio-fips-180-4">[FIPS-180-4]</a>, of the resulting serial form.

The canonicalisation algorithm is as follows:

* JSON object values MUST be sorted into lexicographical order. The 
  keys of a JSON object must be a valid field name, which is
  restricted to the alphabet of lower case letters and hyphens, which
  makes this ordering relatively simple to implement.
* All whitespace MUST be removed.
* Characters in strings must be represented as follows:
  * For ASCII control characters (codepoints 0x00 - 0x1f):
    * If it has a short representation (<code>\b</code>, <code>\f</code>, <code>\n</code>, <code>\r</code>, or <code>\t</code>), that short representation MUST be used.
    * Other control characters (such as NULL) MUST be represented as a <code>\u00XX</code> escape sequence.  Hexadecimal digits MUST be upper-case.
  * Backslash (<code>\</code>) and double quote (<code>"</code>) MUST be escaped as <code>\\</code> and <code>\"</code> respectively.
  * All other characters MUST be included literally (ie unescaped).  This includes forward-slash (<code>/</code>).


