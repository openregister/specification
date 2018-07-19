---
id: minting
title: Minting
url: /minting/
---

## Minting a new entry

To mint a new entry in the register:

* POST a new item in <a href="#json-representation">§11.2 JSON representation</a> to the ..mint url.. with the proposed new entry number.
* The item will first appear as a new item in the store
* <em> .. status codes and error cases </em>
* <em> .. 202 Accepted with a Location header of the <a href="#entry-resource">§3.2 Entry resource</a> for the new entry</em>
* The proposer can only trust it has been secured when the entry
  is listed in the <a href="#entries-resource">§5.2 Entries resource</a> with the same <a href="#entry-number-field">§9.4 entry-number</a>,
  and the <a href="#entry-resource">§3.2 Entry resource</a> is a covered by one or more <a href="#digital-proofs">§12 Digital Proofs</a> for the register.

The item MUST NOT contain empty fields.


