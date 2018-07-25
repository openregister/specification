---
id: entry-proof-resource
title: Entry Proof resource
url: /resources/entry-proof-resource/
status: wip
---

* Endpoint: `/proof/entries/{entry-number}/{log-size}/{proof-identifier}`
* Parameters:
  * `entry-number`: (Integer) The entry number to proof.
  * `log-size`: (Integer) The size of the log.
  * `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.

Response attributes:

* `proof-identifier`: (String) The type of proof. Possible values: `merkle:sha-256`.
* `entry-number`: (Integer) The entry number for the proof.
* `merkle-audit-path`: ([Hash]) The list of node hashes. 

***
TODO: Move to the glossary
***

***
TODO: The `entry-number` in the response MUST be an integer.
***


An entry proof is the information required to prove the integrity of a single
entry within a register of size total-entries, given a <a
href="#register-proof-resource">§3.5 Register proof resource</a>.

The important characteristic of an entry proof is that it means the client
does not need to download the entire register just to verify the integrity of
a single entry.

There may be different kinds of entry proof available.

***
**EXAMPLE:**


The following example shows the request for the representation of the entry
proof for entry 10 at log size 200.

```http
GET /proof/entries/10/200/merkle:sha-256 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "proof-identifier": "merkle:sha-256",
  "entry-number": "10",
  "merkle-audit-path": [
    "sha-256:f0ebeef6be205cfc5fb6b4a314294bdff471f5409594f742b0f30c8551278b4a",
    "sha-256:8dc980062c4e6ffd2300b72cd5a6a67e23070aabec31911691c657c2e1dd37a6",
    "sha-256:c48916df15f3f6e030d84bf0f8bb59460c472250d38db27b4cd2e7394fe0741d",
    "sha-256:08e9d6bd5717717c1c40ba518ccf02cad9c412eae6052739552ecd4a668b4ec3",
    "sha-256:43834a10ac7dcecc7bb274d67f79dc5da4c03efb6dadc20657595ca4b261df4d",
    "sha-256:10d897e8df0096412f45e9c16c61eed7b335267d803872f85ce0d25218fc82eb",
    "sha-256:e483ea76d5ca3fdcef64ae8a2c910d1e47b90507a364da8dc4878cacd48cd414",
    "sha-256:ca77ecfa5a4e847c65fda8f41f73758456814acf473bab2811516aeaac17f7cc"
  ]
}
```
***
