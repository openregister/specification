---
id: proof-resource
title: Proofs
url: /rest-api/proofs
version: v1
status: exp
---

## Get the register proof

***
NOTE: See the [Register proof](/v1/glossary/digital-proof#register-proof) definition to understand how
this resource fits into the [data model](/v1/data-model).
***

***
### Endpoint

```
GET /proof/register/{proof-identifier}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|
|`total-entries`| [Integer](/v1/datatypes/integer)|The size of the log when the proof was issued.|
|`root-hash`| [Hash](/v1/datatypes/hash)|The root hash for the log when the proof was issued.|
***

Gets the register proof for the given type of proof.

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


## Get a consistency proof

***
NOTE: See the [consistency proof](/v1/glossary/digital-proof#consistency-proof) definition to
understand how this resource fits into the [data model](/v1/data-model).
***

***
### Endpoint

```
GET /proof/consistency/{small-log-size}/{large-log-size}/{proof-identifier}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`small-log-size`| [Integer](/v1/datatypes/integer)|The size of the smaller log.|
|`large-log-size`| [Integer](/v1/datatypes/integer)|The size of the larger log.|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|
|`merkle-consistency-nodes`| List of [Hash](/v1/datatypes/hash)|The list of node hashes.|
***

Gets the consistency proof for the given log sizes and proof type.

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


## Get an entry proof

***
NOTE: See the [entry proof](/v1/glossary/digital-proof#entry-proof) definition to understand
how this resource fits into the [data model](/v1/data-model).
***

***
### Endpoint

```
GET /proof/entries/{entry-number}/{log-size}/{proof-identifier}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/v1/datatypes/integer)|The entry number to proof.|
|`log-size`| [Integer](/v1/datatypes/integer)|The size of the log.|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`proof-identifier`| [String](/v1/datatypes/string)|The type of proof. Possible values: `merkle:sha-256`.|
|`entry-number`| [Integer](/v1/datatypes/integer)|The entry number for the proof.|
|`merkle-audit-path`| List of [Hash](/v1/datatypes/hash)|The list of node hashes.|
***

Gets the entry proof for the given entry, log size and proof type.

***
ISSUE: The `entry-number` in the response MUST be an integer. Ref impl fails to
do so.
***

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
  "entry-number": 10,
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
