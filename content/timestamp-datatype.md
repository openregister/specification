---
id: timestamp-datatype
title: Timestamp
url: /datatypes/timestamp/
---

A value conforming to a UTC [RFC3339](@rfc3339) timestamp. It can be seen as a
strict subset of the [datetime datatype](/datatypes/datetime/).

```abnf
;           timestamp
timestamp   = date "T" time
date        = century year DSEP month DSEP day
time        = hour TSEP minute TSEP second timezone

;           date
century     = 2digit                               ; i.e. 00-99
year        = 2digit                               ; i.e. 00-99
month       = "0" non-zero / "1" ("0" / "1" / "2") ; i.e. 01-12
day         = 2digit                               ; i.e. 01-28, 01-29, 01-30, 01-31 based on month/year
DSEP        = "-"                                  ; date separator

;           time
hour        = 2digit ; 00-24
minute      = 2digit ; 00-59
second      = 2digit ; 00-58, 00-59, 00-60 based on leap-second rules
TSEP        = ":"    ; time separator
timezone    = "Z"  ;

digit = "0" / non-zero
non-zero =  "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
```

***
**EXAMPLE:**

```
2018-07-15T14:38:05Z
```
***
