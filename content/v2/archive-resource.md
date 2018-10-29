---
id: archive-resource
title: Archive
url: /rest-api/archive
---

***
### Endpoint

```
GET /archive
```
***

The contents of a register MUST be made available as an archive. The archive
file MUST be capable of being used as backup of the register, with the
exception of secrets used to generate [Digital
Proofs](/data-model/audit#digital-proofs). The archive file SHOULD be made
available in a single file, but MAY be split into multiple parts if it deemed
too large.

The archive contains the following files in the following structure:

* A directory with the name of the register containing:
  * A file named "context.json" containing the [context](/glossary/context) serialised as [JSON](/rest-api#json).
  * A directory named "blobs" containing all of the [blobs](/glossary/blob) serialised in one or more [JSON](/rest-api#json) files.
  * A directory named "entries" containing all of the [Entry](/glossary/entry) serialised as one or more [JSON](/rest-api#json) files.

***
**EXPERIMENTAL:**

As part of the digital proofs experiment, 
a file named "proofs.json" containing one or more [digital proofs](/glossary/proof) serialised as [JSON](/rest-api#json) SHOULD be included.
***

***
**EXAMPLE:**

```http
GET /archive
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

The content negotiation must happen based on the same rules that apply to
other resources but, instead of JSON and CSV, this enpoint expects ZIP. ZIP is
the default response when there is no extension or Accept header.

The decision logic is as follows:

1. Let _req_ be the incoming request.
2. If _req_ has an extension:
    1. If it is .zip, return (200, `application/octet-stream`)
    1. If it is _known extension_, return (200, _known content type_)
    1. Otherwise, return 406, Not Acceptable.
3. If instead _req_ has an Accept header:
    1. If it is `application/octet-stream`, return (200, `application/octet-stream`)
    1. If it is _known content type_, return (200, _known content type_)
    1. Otherwise, return 406, Not Acceptable.
4. Otherwise, return (200, application/octet-stream)

### Zip

* Suffix: `.zip`
* Content type: `application/octet-stream`

***
**NOTE:**

The reference implementation has an extension for this endpoint using a custom
format, RSF, that allows getting a registers slice. The extension uses two
parameters on `GET /archive` and a custom content type:

```
GET /archive?from={n}&to={m}
```

For example, you can get the slice from entry 40 to entry 100.

```http
GET /archive?from=40&to=100 HTTP/1.1
Host: country.register.gov.uk
Accept: application/vnd.rsf
```

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.rsf

...
```
***
