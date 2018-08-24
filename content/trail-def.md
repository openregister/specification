---
id: trail-def
title: Trail
url: /glossary/trail
---

A **trail** is the list of [entries](/glossary/entry) for a given key. It
represents the history of changes for a given key.

```elm
type Trail =
  List Entry
```

A trail can be seen as a function `filterBy` that derives from a given
[log](/glossary/log):

```elm
filterBy : ID -> Log -> Maybe Trail
```

The algorithm:

1. Let _key_ be the identifier for the record to find.
1. Let _log_ be the full log to parse.
1. Let _result_ be an empty array.
1. Foreach _entry_ in the _log_:
    1. If the _entry_ key equals the _key_, append __entry__ to  _result_.

       Otherwise, do nothing.

After all entries in the log have been inspected, the latest one stored in
_result_ is the record. If no entries were found for _key_, the trail doesn't
exist in the Register.

Similar to the [snapshot](/glossary/snapshot), there is a function to get the
[record](/glossary/record) from the **trail**:

```elm
record : Trail -> Entry
```

The algorithm:

1. Let _trail_ be the full list of entries for a key.
1. Let _result_ be null.
1. Foreach _entry_ in the _log_:
    1. If the _entry_ id is bigger than the one stored in _result_, set
       _entry_ in _result_.

       Otherwise, do nothing.

After all entries in the log have been inspected, the latest one stored in
_result_ is the record.

![](./data-model/data-model-trail.svg)

***
**EXAMPLE:**

For example, given a log:

```elm
log =
  [ Entry
     { number : 1
     , key: ID "A"
     ...
     }
  , Entry
     { number : 2
     , key: ID "B"
     ...
     }
  , Entry
     { number : 3
     , key: ID "Z"
     ...
     }
  , Entry
     { number : 4
     , key: ID "A"
     ...
     }
  , Entry
     { number : 5
     , key: ID "Z"
     ...
     }
  ]
```

The trail for element “A” is:

```elm
filterBy (ID "A") log == Just Trail
                          [ Entry
                            { number : 1
                            , key: ID "A"
                            ...
                            }
                         , Entry
                            { number : 4
                            , key: ID "A"
                            ...
                            }
                         ]
```

And the record:

```elm
record (ID "A") log == Just Entry
                          { number : 4
                          , key: ID "A"
                          ...
                          }
```
***
