---
id: period-datatype
title: Period
url: /datatypes/period/
status: wip
---

A period of time conforming to the subset of [ISO8601](@iso8601) time
intervals as follows:

```abnf
period =  start-end / start-duration / duration-end / duration
start-end = datetime "/" datetime
start-duration = datetime "/" duration
duration-end = duration "/" datetime
```

Where `datetime` is a [datetime datatype](/datatypes/datetime) and `duration`
is a [duration](#duration).

***
**EXAMPLE:**

The following examples are all valid Period values:

```
2007-03-01T13:00:00Z/2008-05-11T15:30:00Z
2007-03-01T13:00:00Z/P1Y2M10DT2H30M
P1Y2M10DT2H30M/2008-05-11T15:30:00Z
P1Y2M10DT2H30M
```
***

### Duration

A duration of time conforming to [ISO8601](@iso8601). A duration is an
abstract period of time so its length will depend on an starting or ending
point in time.

```abnf
duration = "P" date / "P" "T" time / "P" date "T" time
date   = years [months] [days] / [years] months [days] / [years] [months] days
time   = (hours [minutes] [seconds] / hours minutes [seconds] / [hours] [minutes] seconds)

years  = non-zero "Y"
months  = non-zero "M"
days  = non-zero "D"
hours  = non-zero "H"
minutes  = non-zero "M"
seconds  = digit "S"

digit = "0" / non-zero
non-zero =  "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
```

***
NOTE: The expression `PT0S` is the only one allowed when expressing an empty
duration.
***

This specification chooses not to allow any fractional component in the smallest
time atom.

***
**EXAMPLE:**

For example, a duration such as:

```
P1M
```

Is of length of one month. “Month” is an abstract concept with multiple
possible lengths. To make the length concrete you need a period of time:

```
2018-01-01/P1M  -- 31 days
2018-02-01/P1M  -- 28 days
```
***
