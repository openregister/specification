---
id: record-def
title: Record
url: /glossary/record/
status: wip
---

***
TODO: If a record is an entry, I want a resource for the latest data for a
given key, with no metadata in it.
***

A record is an element of the latest [snapshot](/glossary#snapshot). It can be
computed from the [log](/glossary#log) by a similar method of computing a
snapshot.

```elm
record : Key -> Log -> Maybe Entry
```

The algorithm:

1. Let _key_ be the identifier for the record to find.
1. Let _log_ be the full log to parse.
1. Let _result_ be empty.
1. Foreach _entry_ in the _log_:
    1. If the _entry_ key equals the _key_, store it in _result_.

       Otherwise, do nothing.

After all entries in the log have been inspected, the latest one stored in
_result_ is the record. If no entries were found for _key_, the record doesn't
exist in the Register.

***
NOTE: The reference implementation inlines the [Item](/glossary/item/) in the
[Record resource](/resources/record-resource/) for convenience.
***

***
TODO: Is the above note normative or, what are the true expectations we want
to set for consuming records?
***
