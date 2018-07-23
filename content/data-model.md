---
id: data-model
title: Data model
url: /data-model/
status: wip
---

***
NOTE: This document uses **bold** to introduce important concepts.
***

Informally, a Register is an unordered dataset of elements of a single type of
thing with the ability to provide previous versions for the elements held in
it. The dataset can be mapped to any of the
[representations](/representations/) defined in this specification.

***
TODO: Previous versions of this spec used the word “infoset”. Now we use
“dataset”. Are we loosing any particular nuance by doing this change?
***

## The log

More formally, a Register is a **log** of changes on a dataset.

The Register **log** is a sequence of entries identified by their numerical
order. This specification refers to this concept as the “entry number”.

Each **entry** defines a change for an element in the dataset by recording the
time the change was appended to the log, the numerical order in the log, the
key to identify the element the change is for and the reference to the data
for that element, the **item**.

An **item** is a set of values for the attributes defined in the **schema**.

In summary, the **log** and all its parts are an immutable data structure that
allow expressing a sequence of changes to a dataset.

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

A **snapshot** is the dataset resulting from walking through the **log** start
to end and taking the latest data for each element.  When the snapshot is for
the latest change the elements are called **records**. In other words, it can
be seen as a pair of functions `take` and `view` where `take` slices a log for
the given index size:

```elm
take : Log -> Int -> Log
```

And a `view` function that derives the snapshot for the given log:

```elm
view : Log -> Snapshot
```

***
TODO: Perhaps instead of elm-ish, use a diagram
***

A snapshot can be seen as a **version** of the dataset.

## Auditability

A Register uses a sidecar data structure derived from the **log** that allows
anyone to efficiently audit the integrity of the data held in it. This data
structure is a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) as
described by the Certificate Transparency [RFC6962](@rfc6962). Check the
[Digital proofs](/digital-proofs/) section for details.
