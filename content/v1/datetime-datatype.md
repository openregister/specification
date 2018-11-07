---
id: datetime-datatype
title: Datetime
url: /datatypes/datetime
version: v1
---

A datetime conforming to the subset of a UTC [ISO8601](@iso8601) date or
datetime as follows:

```abnf
;          datetime
datetime   = date / date "T" time
date       = century year [DSEP month [DSEP day]]
time       = hour [TSEP minute [TSEP second]] timezone

;          date
century    = 2digit                               ; i.e. 00-99
year       = 2digit                               ; i.e. 00-99
month      = "0" non-zero / "1" ("0" / "1" / "2") ; i.e. 01-12
day        = 2digit                               ; i.e. 01-28, 01-29, 01-30, 01-31 based on month/year
DSEP       = "-"                                  ; date separator

;          time
hour       = 2digit ; 00-24
minute     = 2digit ; 00-59
second     = 2digit ; 00-58, 00-59, 00-60 based on leap-second rules
TSEP       = ":"    ; time separator
timezone   = %s"Z"  ;

digit = "0" / non-zero
non-zero =  "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9"
```

***
**EXAMPLE:**

For example, the following Datetime values are valid:

```
2001
2001-01
2001-01-31
2018-10-11T12Z
2018-10-11T12:14Z
2001-01-31T23:20:55Z
```

***

***
**NOTE:**

The consumer is responsible for deciding the right interpretation for reduced
accuracy.
***
