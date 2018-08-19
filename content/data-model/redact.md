---
id: redact
title: Redact
url: /data-model/redact/
status: wip
---

In order to redact a piece of data, the whole data blob
([item](/glossary/item/)) has to be unavailable to the user. Any
[entry](/glossary/entry/) referencing the redacted data MUST be available at
all times to guarantee the [integrity](/data-model/audit/) of the Register.

The redaction process MUST provide a way to distinguish between a data blob
that doesn't exist and a data blob that has been redacted.

See the [Item](/rest-api/items/) for details of how to let
users know whether an item never existed or whether it existed but now it's
gone due to redaction.

***
ISSUE: [#24](https://github.com/openregister/registers-rfcs/pull/24) Define a
way to offer redactability for data points rather than the whole blob.
***
