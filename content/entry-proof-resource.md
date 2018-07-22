---
id: entry-proof-resource
title: Entry Proof resource
url: /resources/entry-proof-resource/
status: wip
---

### Entry proof resource

* Path: `/proof/entries/{entry-number}/{total-entries}/{proof-identifier}`


An entry proof is the information required to prove the integrity of a single
entry within a register of size total-entries, given a <a
href="#register-proof-resource">§3.5 Register proof resource</a>.

The important characteristic of an entry proof is that it means the client
does not need to download the entire register just to verify the integrity of
a single entry.

There may be different kinds of entry proof available.

***
**EXAMPLE:**


The following example shows a Merkle-tree-based entry proof in the <a href="#json-representation">§11.2 JSON representation</a>:

```http
GET /proof/entries/123/130/merkle:sha-256 HTTP/1.1
Host: https://school.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "entry-number": "123",
  "merkle-audit-path": [ "sha-256:zWJuGh1KFSTHoI1zo0gBm9mRMeCrb8nTQdnAgT3llO8=", "sha-256:e2vgurA5X7wd9dtGXNvVRl9y2ICDIRpx3bf4ucb2wbY=" ]
}
```
***
