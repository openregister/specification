---
id: data-model
title: Data model
url: /data-model/
status: wip
---

Informally, a Register is an unordered dataset of elements of a single type of
thing with the ability to provide previous versions for the elements held in
it. The dataset can be mapped to any of the [serialisation
formats](/rest-api#serialisation) defined in this specification and it can be
published over HTTP as a [REST API](/rest-api/).

More formally, a Register is a **log** of changes on a dataset.

The Register [log](/glossary/log/) is a sequence of entries identified by
their numerical order, the [entry number](/glossary/entry#number).

Each [entry](/glossary/entry/) defines a change for an element in the dataset
by recording the time the change was appended to the log, the numerical order
in the log, the key to identify the element the change is for and the
reference to the data for that element, the [item](/glossary/item/), a set of
attribute-value pairs as defined in the [schema](/glossary/schema/).

In summary, the **log** and all its parts are an immutable data structure that
allow expressing a sequence of changes on a dataset.

***
ISSUE: Schema is not well defined yet and it shouldn't be needed to define the
item at this level of abstraction.
***

***
TODO: Diagram with the relationship between log and entry (and item?)
***

The result of applying a change to the dataset is a new
[snapshot](/glossary/snapshot/) and, when the snapshot is the latest one, the
elements are called [records](/glossary/record/).


## Auditability

A Register uses a sidecar data structure derived from the **log** that allows
anyone to efficiently audit the integrity of the data held in it. This data
structure is a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) as
described by the Certificate Transparency [RFC6962](@rfc6962). Check the
[Digital proofs](/digital-proofs/) section for details.
