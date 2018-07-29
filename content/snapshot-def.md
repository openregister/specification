---
id: snapshot-def
title: Snapshot
url: /snapshot/
status: wip
---

## The snapshot

A **snapshot** is the dataset resulting from walking through the
[log](/glossary/log/) start to end and taking the latest data for each
element. When the snapshot is for the latest change the elements are called
[records](/glossary/record/).

A snapshot can be seen as a pair of functions `take` and `collect` where `take`
slices a log at the given size:

```elm
take : Log -> Int -> Log
```

And a `collect` function that derives the snapshot for the given log:

```elm
collect : Log -> Snapshot
```

![A picture of transforming a log into a snapshot](data-model-snapshot.png)

A snapshot can be seen as a **version** of the dataset.
