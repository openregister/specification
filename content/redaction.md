---
id: redaction
title: Redaction
url: /redaction/
status: wip
---

In order to redact a piece of data, the whole data blob (item) has to be
removed from the Register. Any entry linking to the piece of data in question
MUST NOT be removed from the log ever as it breaks the integrity of the
Register.

The redaction process MUST provide a way to distinguish between a data blob
that doesn't exist and a data blob that has been redacted.

See the [Item resource](/resources/item-resource/) for details of how to let
users know whether an item never existed or whether it existed but now it's
gone due to redaction.

***
TODO: Define a fine-grained redaction by changing hashing process (e.g.
objecthash).
***
