---
id: data-model
title: Data model
url: /data-model/
---

**Work in progress**

Note: This document will use **bold** to highlight important concepts as they
are introduced.

Informally, a Register is a dataset (for a single type of thing) with the
ability to provide previous versions of the data held in it.

## The log

More formally, a Register is a **log** of changes on a dataset.

The Register log is a sequence of entries identified by their numerical order.
This specification refers to this concept as the “entry number”.

Each **entry** defines a change for an element in the dataset by recording the
time the change was appended to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the **item**.

An **item** is a set of values for the attributes defined in the **schema**.

***
TODO: Schema is not well defined yet and it shouldn't be needed to define the
item at this level of abstraction.
***

***
TODO: If **item** is not defined while defining the concept of log, does it
matter?
***

***
TODO: Diagram with the relationship between log and entry (and item?)
***

## The snapshot

A **snapshot** is the dataset resulting from walking through the **log** start to
end and taking the latest data for each element.
When the snapshot is for the latest state of the Register the elements are
called **records**. In other words, there is a function `f` such as:

```elm
f : Log -> Size -> Snapshot
```

OR 

```elm
slice : Log -> Int -> Log
compile : Log -> Snapshot
```

***
TODO: Perhaps instead of elm-ish, use a diagram
***

A snapshot can be seen as a **version** of the dataset.

## Auditability

A Register uses a sidecar data structure derived from the **log** that allows
anyone to efficiently audit the integrity of the data held in it. This data
structure is a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) as
described by the Certificate Transparency [RFC6962](bib://rfc6962). Check the
[Digital proofs](/digital-proofs/) section for details.

***
TODO: Perhaps the digital-proofs section should be under data-model?
***
