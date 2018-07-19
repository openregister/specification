---
id: period-datatype
title: Period datatype
url: /datatypes/period/
---

### Period datatype

```abnf
period =  start-end / start-duration / duration-end / duration
start-end = datetime "/" datetime
start-duration = datetime "/" duration
duration-end = duration "/" datetime
```

Where `datetime` is a [datetime datatype](#datetime-datatype) and `duration`
is a [duration pattern](#duration-pattern).

* Period values are all valid [ISO8601].

---
**Example**

The following examples are all valid Period values:

```
2007-03-01T13:00:00Z/2008-05-11T15:30:00Z
2007-03-01T13:00:00Z/P1Y2M10DT2H30M
P1Y2M10DT2H30M/2008-05-11T15:30:00Z
P1Y2M10DT2H30M
```

---

#### Duration pattern

```abnf
duration = "P" date / "P" "T" time / "P" date "T" time
date   = years [months] [days] / [years] months [days] / [years] [months] days
time   = (hours [minutes] [seconds] / hours minutes [seconds] / [hours] [minutes] seconds) timezone

years  = non-zero "Y"
months  = non-zero "M"
days  = non-zero "D"
hours  = non-zero "H"
minutes  = non-zero "M"
seconds  = digit "S"

timezone = "Z"

digit = "0" / non-zero
non-zero =  "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
```

Note that the expression `PT0S` is the only one allowed when expressing an
empty duration.

This specification chooses not to allow any fractional component in the smallest
time atom.


