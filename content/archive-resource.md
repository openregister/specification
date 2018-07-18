---
id: archive-resource
title: Archive resource
url: /resources/archive-resource/
---

## Archive resource

* Path: `/download-register`

The contents of an register MUST be made available as an archive.  The archive
file MUST be capable of being used as backup of the register, with the
exception of secrets used to generate <a href="#digital-proofs">§12 Digital
Proofs</a>.  The archive file SHOULD be made available in a single file, but
MAY be split into multiple parts if it deemed too large.

The archive contains the following files in the following structure:

* a directory with the name of the register containing
  * a file named "register.json" containing the <a href="#register-resource">§3.4 Register resource</a> in the <a href="#json-representation">§11.2 JSON representation</a>
  * a file named "proof.json" containing one or more digital proofs for the register in the <a href="#json-representation">§11.2 JSON representation</a>
  * a directory named "item" containing all of the <a href="#item-resource">§3.1 Item resource</a> in one or more parts in the <a href="#json-representation">§11.2 JSON representation</a>
  * a directory named "entry" containing all of the <a href="#entry-resource">§3.2 Entry resource</a> in one or more files in the <a href="#json-representation">§11.2 JSON representation</a>

A register archive MAY contain entry and item resources in the more space
efficient <a href="#tsv-representation">§11.5 TSV representation</a>.


