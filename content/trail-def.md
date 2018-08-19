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

Similar to the [snapshot](/glossary/snapshot), there is a function to get the
[record](/glossary/record) from the **trail**:

```elm
record : Trail -> Entry
```

![](./data-model/data-model-trail.svg)
