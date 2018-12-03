---
id: v2-changelog
title: Changelog
url: /v2/changelog
version: v2
---

This version has breaking changes to the API due to GDPR (i.e. redactability)
and the indexes experiment being rolled back.

This is the first version that has driven changes using the RFC (Request For
Comments) flow. See
[RFC0000](https://github.com/openregister/registers-rfcs/blob/master/content/rfc-process/index.md).

RFCs for version 2:

|ID|Name|Breaking change|
|-|-|-|
|0002|[URI consolidation](https://github.com/openregister/registers-rfcs/blob/master/content/uri-consolidation/index.md)|Yes|
|0003|[Entry timestamp meaning](https://github.com/openregister/registers-rfcs/blob/master/content/meaning-of-entry-timestamp/index.md)|No|
|0004|[Format reduction](https://github.com/openregister/registers-rfcs/blob/master/content/format-reduction/index.md)|Yes|
|0005|[Reference strategy](https://github.com/openregister/registers-rfcs/blob/master/content/reference-strategy/index.md)|No|
|0008|[Entry key constraints](https://github.com/openregister/registers-rfcs/blob/master/content/entry-key-constraints/index.md)|No|
|0009|[Entry hash](https://github.com/openregister/registers-rfcs/blob/master/content/entry-hash/index.md)|Yes|
|0010|[Item hash](https://github.com/openregister/registers-rfcs/blob/master/content/item-hash/index.md)|Yes|
|0013|[Multihash](https://github.com/openregister/registers-rfcs/blob/master/content/multihash/index.md)|Yes|
|0016|[Blob resource](https://github.com/openregister/registers-rfcs/blob/master/content/blob-resource/index.md)|Yes|
|0017|[Full item redaction](https://github.com/openregister/registers-rfcs/blob/master/content/full-item-redacted/index.md)|No|
|0018|[Context resource](https://github.com/openregister/registers-rfcs/blob/master/content/context-resource/index.md)|No|
|0019|[Boolean datatype](https://github.com/openregister/registers-rfcs/blob/master/content/boolean-datatype/index.md)|No|
|0020|[Blob normalisation](https://github.com/openregister/registers-rfcs/blob/master/content/blob-normalisation/index.md)|No|
|0021|[Archive resource](https://github.com/openregister/registers-rfcs/blob/master/content/archive-resource/index.md)|Yes|
|0022|[Facets endpoint](https://github.com/openregister/registers-rfcs/blob/master/content/facets-endpoint/index.md)|Yes|
|0023|[Proof resource](https://github.com/openregister/registers-rfcs/blob/master/content/proof-resource/index.md)|Yes|
|0024|[Indexes removal](https://github.com/openregister/registers-rfcs/blob/master/content/indexes-removal/index.md)|Yes|
|0025|[Snapshot resource](https://github.com/openregister/registers-rfcs/blob/master/content/snapshot-resource/index.md)|Yes|

Note that “breaking change” means that to fully use this version an action is
required by the user consuming registers. The version strategy offers ways to
make the transition non-disruptive.

### Redaction

Addressed by: RFC0010, RFC0017, RFC0020

The “right to be forgotten” from GDPR is not easy to achieve with immutable
data structures that rely on such immutability to guarantee the integrity of
the data. The way blobs (formerly known as items) were hashed didn't allow to
redact specific values.

The only way (ill-defined) was to remove the entire blob and keep record of
its existence by keeping record of the hash. This strategy means that when piece
of data that needs to be removed exists for all versions of the element, you
need to remove all blobs and add a new version without the problematic piece
of data. The consequence of that is the complete removal of the history of
changes for that element. This was considered not good enough.

#### Who is affected?

* Anyone that relies on blob hashes to identify resources (e.g. consume entries
and their associated blobs).
* Anyone that relies on Proofs.

### Entry definition

Addressed by: RFC0003, RFC0008, RFC0009

Entries weren't well defined. There was a lack of clarity on what
could be expected from them; the Proofs experiment requires to generate a hash
from each entry in the log but the algorithm wasn't defined and also it was
dependent on another experiment, the Indexes experiment; and finally, the
“key” values were defined as if any UTF-8 string could have been a valid key
but it didn't play well with using these values in CURIEs.

#### Who is affected?

* Anyone that relies on Proofs.

### Serialisation formats

Addressed by: RFC0004

Previously, many serialisation formats were specified as optional but none was
required. The implications of that were that a registers implementation had to
implement all of them to ensure interoperability with tools consuming
registers. That made the ecosystem of implementations and tools too brittle.

The decision was to require JSON and suggest CSV.

#### Who is affected?

* Anyone using formats other than JSON and CSV.

### Hashing strategy unification

Addressed by: RFC0013, RFC0018, RFC0023

Previously, the specification didn't define well if multiple hashing
algorithms were allowed and how that would work. It is a complex topic and it
gets more complex when you need redactability and proofs.

The decision was to define the hashing algorithm per register, expose it as
metadata and make hashes self-descriptive with a more robust strategy.

#### Who is affected?

* Anyone using hashes (blob identification, proofs).

### URL normalisation

Addressed by: RFC0002, RFC0005

Previously, URLs had different names for resources and collection resources
(e.g. entry, entries), and some resources didn't use the name of the resource
(i.e. download-register). Also, there were two strategies for linking between
registers, one of them relying on undefined conventions, the other partially
broken because the URL structure already mentioned.

The decision was to unify the linking strategy to CURIEs and use URL patterns
that play well with CURIEs.

#### Who is affected?

* Anyone relying on old URLs. Note that old URLs are expected to be
  redirecting to the new ones.

### Indexes experiment

Addressed by: RFC0024

Version 1 introduced an experiment aiming to generalise the way registers
were queried. After more than a year with the experiment in place we concluded
that the flexibility wasn't worth it due the increase of complexity. We may
revisit this decision in the future if we find a more balanced approach.

#### Who is affected?

* Everyone.

### Other changes

The rest of the changes are mostly attempts to improve the usability of
registers. For example, RFC0025 makes more clear what resources are high level
(records) and what resources are building blocks.

#### Who is affected?

* Everyone.
