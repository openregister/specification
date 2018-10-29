---
id: v1-snapshot-def
title: Snapshot
url: /v1/glossary/snapshot
version: v1
---

A **snapshot** is the dataset resulting from walking through the
[log](/v1/glossary/log) start to end and taking the latest data for each
element.

```elm
type Snapshot =
  Dict ID Entry
```

***
NOTE: When the snapshot is for the latest change the elements are called
[records](/v1/glossary/record).
***

A snapshot can be seen as a function `collect` that derives the snapshot from
a given log:

```elm
collect : Log -> Snapshot
```

The algorithm:

1. Let _log_ be the full log to parse.
1. Let _result_ be an empty associative array.
1. Foreach _entry_ in the _log_:
    1. If the _entry_ has bigger number than the one in _result_ or it doesn't
       exist, add (key, _entry_) to _result_.

       Otherwise, do nothing.

To get a previous snapshot, take an slice of the log from the start.

![A picture of transforming a log into a snapshot](./data-model/data-model-snapshot.svg)

A snapshot is sometimes referred as **version** of the dataset.
