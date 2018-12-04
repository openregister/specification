---
id: v2-version
title: Version
url: /v2/data-model/version
version: v2
---

A **version** of the dataset is a [snapshot](/v2/glossary/snapshot) at a
particular point in the [log](/v2/glossary/log) of changes. There is no specific
**version** identifier although the [entry number](/v2/glossary/entry#number)
used to set the log size to compute the snapshot can act as such.


![A picture of collecting two versions from the log](data-model-versions.svg)


The latest version is the [list of records](/v2/glossary/record).

![A picture of transforming a log into a snapshot](data-model-snapshot.svg)


Data can be sliced in a different way to collect all versions for a particular
element, the [trail](/v2/glossary/trail).
