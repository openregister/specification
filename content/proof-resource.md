---
id: proof-resource
title: Proofs
url: /rest-api/proofs
status: exp
---

***
NOTE: See the [Audit section](/data-model/audit) to learn what these
resources are for.
***

## Get the register proof

***
NOTE: See the [Register proof](/glossary/digital-proof#register-proof) definition to understand how
this resource fits into the [data model](/data-model).
***

***
### Endpoint

```
GET /proofs/register
```

### Response attributes

|Name|Type|Description|
|-|-|-|
|`total-entries`| [Integer](/datatypes/integer)|The size of the log when the proof was issued.|
|`root-hash`| [Hash](/datatypes/hash)|The root hash for the log when the proof was issued.|
***

Gets the register proof for the given type of proof.

***
**EXAMPLE:**

The following example shows the request for the representation of the register
proof.

```http
GET /proofs/register HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "root-hash": "12208d92e1e0af1d43c41e498e6baed0d0b3ea2770d1bf9d2afc04e9c4dad7795729",
  "total-entries": 208
}
```
***


## Get a consistency proof

***
NOTE: See the [consistency proof](/glossary/digital-proof#consistency-proof) definition to
understand how this resource fits into the [data model](/data-model).
***

***
### Endpoint

```
GET /proofs/consistency/{small-log-size}/{large-log-size}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`small-log-size`| [Integer](/datatypes/integer)|The size of the smaller log.|
|`large-log-size`| [Integer](/datatypes/integer)|The size of the larger log.|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`audit-path`| List of [Hash](/datatypes/hash)|The list of node hashes.|
***

Gets the consistency proof for the given log sizes and proof type.

***
**EXAMPLE:**

The following example shows the request for the consistency proof of log size
197 and log size 200 for the `country.register.gov.uk` register:

```http
GET /proofs/consistency/197/200 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "audit-path": [
    "122073f13521226acdfa2a610c7bfdc955fa52aea1d554dd247011312ee48686a538",
    "12208a16bb948f55ef959a5a7ddad5e2d1d398b50f3d7095aba1e97ad50c1fa374a9",
    "1220be8a541a0a763f88c8e4ff5f013e701e5f89c3f9cb744aadfaf19668189de514",
    "1220733c1adf88daff4ba4275b4ff86d373266c17eeb547ef54093ed14649d168865",
    "12206242c4d6fde2c79c26144deab292fc6702d321a7e79c535e146d25f356191f7c",
    "122020b0c02232b50a587671ed9f465fb1a99923a08ff53951b8b9f4bb29648aa112"
  ]
}

```
***


## Get an entry proof

***
NOTE: See the [entry proof](/glossary/digital-proof#entry-proof) definition to understand
how this resource fits into the [data model](/data-model).
***

***
### Endpoint

```
GET /proofs/entries/{entry-number}/{log-size}
```

### Parameters

|Name|Type|Description|
|-|-|-|
|`entry-number`| [Integer](/datatypes/integer)|The entry number to proof.|
|`log-size`| [Integer](/datatypes/integer)|The size of the log.|

### Response attributes

|Name|Type|Description|
|-|-|-|
|`audit-path`| List of [Hash](/datatypes/hash)|The list of node hashes.|
***

Gets the entry proof for the given entry, log size and proof type.

***
**EXAMPLE:**

The following example shows the request for the representation of the entry
proof for entry 10 at log size 200.

```http
GET /proof/entries/10/200 HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "audit-path": [
    "1220f0ebeef6be205cfc5fb6b4a314294bdff471f5409594f742b0f30c8551278b4a",
    "12208dc980062c4e6ffd2300b72cd5a6a67e23070aabec31911691c657c2e1dd37a6",
    "1220c48916df15f3f6e030d84bf0f8bb59460c472250d38db27b4cd2e7394fe0741d",
    "122008e9d6bd5717717c1c40ba518ccf02cad9c412eae6052739552ecd4a668b4ec3",
    "122043834a10ac7dcecc7bb274d67f79dc5da4c03efb6dadc20657595ca4b261df4d",
    "122010d897e8df0096412f45e9c16c61eed7b335267d803872f85ce0d25218fc82eb",
    "1220e483ea76d5ca3fdcef64ae8a2c910d1e47b90507a364da8dc4878cacd48cd414",
    "1220ca77ecfa5a4e847c65fda8f41f73758456814acf473bab2811516aeaac17f7cc"
  ]
}
```
***
