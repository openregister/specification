---
id: snapshot-def
title: Snapshot
url: /glossary/snapshot
status: wip
---

A **snapshot** is the dataset resulting from walking through the
[log](/glossary/log) start to end and taking the latest data for each
element. When the snapshot is for the latest change the elements are called
[records](/glossary/record).

```elm
type Snapshot =
  Dict ID Entry
```

A snapshot can be seen as a function `collect` that derives the snapshot from
a given log:

```elm
collect : Log -> Snapshot
```

To get a previous snapshot, take an slice of the log from the start.

![A picture of transforming a log into a snapshot](./data-model/data-model-snapshot.svg)

A snapshot is sometimes referred as **version** of the dataset.
