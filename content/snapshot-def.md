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

A snapshot can be seen as a pair of functions `take` and `view` where `take`
slices a log at the given size:

```elm
take : Log -> Int -> Log
```

And a `view` function that derives the snapshot for the given log:

```elm
view : Log -> Snapshot
```

***
TODO: Perhaps use a diagram
***

A snapshot can be seen as a **version** of the dataset.