---
id: v1-record-def
title: Record
url: /v1/glossary/record
version: v1
---

A **record** is an [entry](/v1/glossary/entry), element of the latest
[snapshot](/v1/glossary#snapshot).

```elm
record : ID -> Snapshot -> Maybe Entry
```

![](./data-model/data-model-record-2.svg)


A record MAY also be computed from the [log](/v1/glossary#log) by a similar
method of computing a snapshot.

```elm
record : ID -> Log -> Maybe Entry
```

The algorithm:

1. Let _key_ be the identifier for the record to find.
1. Let _log_ be the full log to parse.
1. Let _result_ be null.
1. Foreach _entry_ in _log_:
    1. If the _entry_ key equals _key_, set __entry__ to  _result_.

       Otherwise, do nothing.

After all entries in the log have been inspected, the latest one stored in
_result_ is the record. If no entries were found for _key_, the record doesn't
exist in the Register.

![](./data-model/data-model-record-1.svg)
