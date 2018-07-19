---
id: consistency-proof-resource
title: Consistency Proof resource
url: /resources/consistency-proof-resource/
---

## Consistency proof resource


* Path: `/proof/consistency/{total-entries-1}/{total-entries-2}/{proof-identifier}`

A consistency proof proves the append-only property of a register.

The consistency proof for a register containing total-entries-2 entries and a
previous version of the same register containing total-entries-1 entries
(total-entries-2 > total-entries-1) is the information required to prove that
the first total-entries-1 entries are equal for both, given a <a
href="#register-proof-resource">§3.5 Register proof resource</a> for each
version of the register.

The important characteristic of a consistency proof between two versions of a
register is that the client does not need to download the entirety of either
to verify consistency between the two.

There may be different kinds of consistency proof available.


---

**Example**

The following example shows a Merkle-tree-based consistency proof in the <a href="#json-representation">§11.2 JSON representation</a>:

```http
GET /proof/consistency/1234/1240/merkle:sha-256 HTTP/1.1
Host: https://school.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "merkle-consistency-nodes": [ "sha-256:MAzvw8AsFqZ8Scuc5IPfj0dzl44jJauaNXuZLQxR3bM=", "sha-256:TX/kGqrSEgHGvxLwSMyX5al14G48HyPmKbUYK0+wSCE=" ]
}
```

---


