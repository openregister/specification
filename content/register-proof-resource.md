---
id: register-proof-resource
title: Register Proof resource
url: /resources/register-proof-resource/
status: wip
---

* Endpoint: `GET /proof/register/{proof-identifier}`
* Parameters:
  * `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.

Response attributes:

* `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.
* `total-entries`: (Integer) The size of the log when the proof was issued.
* `root-hash`: (Hash) The root hash for the log when the proof was issued.

***
TODO: Move to the glossary
***

***
TODO: The original example had a `tree-head-signature` but it hasn't been
implemented nor explored yet.
***


A register proof is a digitally-signed demonstration of the integrity of all
of the entries in a register.  Given a register proof, it is possible to
verify that all of the entries and items are correct, and that the entries are
in the correct order.

There may be different kinds of register proof available.  The exact structure
of the proof will depend on the proof algorithm in use.  The algorithm is
identified by a proof-identifier.

***
**EXAMPLE:**

The following example shows the request for the representation of the register
proof.

```http
GET /proof/register/merkle:sha-256 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "root-hash": "sha-256:8d92e1e0af1d43c41e498e6baed0d0b3ea2770d1bf9d2afc04e9c4dad7795729",
  "total-entries": 208
}
```
***
