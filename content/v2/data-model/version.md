---
id: version
title: Version
url: /data-model/version
---

A **version** of the dataset is a [snapshot](/glossary/snapshot) at a
particular point in the [log](/glossary/log) of changes. There is no specific
**version** identifier although the [entry number](/glossary/entry#number)
used to set the log size to compute the snapshot can act as such.


![A picture of collecting two versions from the log](data-model-versions.svg)


The latest version is the [list of records](/glossary/record).

![A picture of transforming a log into a snapshot](data-model-snapshot.svg)


Data can be sliced in a different way to collect all versions for a particular
element, the [trail](/glossary/trail).


![A picture of transforming a log into trails](data-model-trails.svg)
