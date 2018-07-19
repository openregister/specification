---
id: register-proof-resource
title: Register Proof resource
url: /resources/register-proof-resource/
---

### Register proof resource

* Path: `/proof/register/{proof-identifier}`

A register proof is a digitally-signed demonstration of the integrity of all
of the entries in a register.  Given a register proof, it is possible to
verify that all of the entries and items are correct, and that the entries are
in the correct order.

There may be different kinds of register proof available.  The exact structure
of the proof will depend on the proof algorithm in use.  The algorithm is
identified by a proof-identifier.

---

**Example**

The following example shows a Merkle-tree-based register proof in the <a href="#json-representation">§11.2 JSON representation</a>:

```http
GET /proof/register/merkle:sha-256 HTTP/1.1
Host: https://school.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "total-entries": "9803348",
  "timestamp": "2015-08-20T08:15:30Z",
  "root-hash": "sha-256:JATHxRF5gczvNPP1S1WuhD8jSx2bl-WoTt8bIE3YKvU",
  "tree-head-signature":
  "BAMARzBFAiEAkKM3aRUBKhShdCyrGLdd8lYBV52FLrwqjHa5/YuzK7ECIFTlRmNuKLqbVQv0QS8nq0pAUwgbilKOR5piBAIC8LpS"
}
```


