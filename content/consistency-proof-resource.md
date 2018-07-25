---
id: consistency-proof-resource
title: Consistency Proof resource
url: /resources/consistency-proof-resource/
status: wip
---

The resource for a [consistency proof](/glossary#consistency-proof).

* Endpoint: `GET /proof/consistency/{small-log-size}/{large-log-size}/{proof-identifier}`
* Parameters:
  * `small-log-size`: (Integer) The size of the smaller log.
  * `large-log-size`: (Integer) The size of the larger log.
  * `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.

Response attributes:

* `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.
* `merkle-consistency-nodes`: ([Hash]) The list of node hashes.


***
TODO: Move to the glossary
***

A [consistency proof](/auditability/) proves the append-only property of a
register.

The consistency proof for a register containing total-entries-2 entries and a
previous version of the same register containing total-entries-1 entries
(total-entries-2 > total-entries-1) is the information required to prove that
the first total-entries-1 entries are equal for both, given a [Register proof
resource](/resources/register-proof-resource) for each version of the
register.

The important characteristic of a consistency proof between two versions of a
register is that the client does not need to download the entirety of either
to verify consistency between the two.

There may be different kinds of consistency proof available.


***
**EXAMPLE:**

The following example shows the request for the consistency proof of log size
197 and log size 200 for the `country.register.gov.uk` register:

```http
GET /proof/consistency/197/200/merkle:sha-256 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "merkle-consistency-nodes": [
    "sha-256:73f13521226acdfa2a610c7bfdc955fa52aea1d554dd247011312ee48686a538",
    "sha-256:8a16bb948f55ef959a5a7ddad5e2d1d398b50f3d7095aba1e97ad50c1fa374a9",
    "sha-256:be8a541a0a763f88c8e4ff5f013e701e5f89c3f9cb744aadfaf19668189de514",
    "sha-256:733c1adf88daff4ba4275b4ff86d373266c17eeb547ef54093ed14649d168865",
    "sha-256:6242c4d6fde2c79c26144deab292fc6702d321a7e79c535e146d25f356191f7c",
    "sha-256:20b0c02232b50a587671ed9f465fb1a99923a08ff53951b8b9f4bb29648aa112"
  ]
}

```
***
