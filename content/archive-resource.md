---
id: archive-resource
title: Archive
url: /rest-api/archive/
status: wip
---

***
### Endpoint

```
GET /download-register
```
***

***
ISSUE: Create a RFC to change this endpoint to `GET /archive`
***

***
TODO: This endpoint should return RSF as a non-normative serialisation format.
***

The contents of a register MUST be made available as an archive. The archive
file MUST be capable of being used as backup of the register, with the
exception of secrets used to generate [Digital
Proofs](/auditing#digital-proofs). The archive file SHOULD be made
available in a single file, but MAY be split into multiple parts if it deemed
too large.

The archive contains the following files in the following structure:

***
TODO: Review this structure is the best we can do
***

* A directory with the name of the register containing:
  * A file named "register.json" containing the [Register summary](/glossary/summary/) serialised as [JSON](/rest-api#json).
  * A file named "proof.json" containing one or more digital proofs for the register serialised as [JSON](/rest-api#json).
  * A directory named "item" containing all of the [items](/glosssary/item/) serialised in one or more [JSON](/rest-api#json) files.
  * A directory named "entry" containing all of the [Entry](/glossary/entry/) serialised as one or more [JSON](/rest-api#json) files.

***
**EXAMPLE:**

```http
GET /download-register
Host: country.register.gov.uk
Accept: application/octet-stream
```

```http
HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

...
```
***
