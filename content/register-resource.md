---
id: register-resource
title: Register resource
url: /resources/register-resource/
status: wip
---

### Register resource


* Path: `/register`

The register resource is <a href="#infoset">§2 Infoset</a> with the following fields:

* `domain`: The Internet domain the register is available from.
* `last-updated`: The date the register was last updated.
* `register-record`: A copy of the <a href="#register-register">§10.1 Register register</a> <a href="#record-resource">§3.3 Record resource</a> entity describing this register.
* `total-items`: An <a href="#integer-datatype">§8.3 Integer datatype</a> value representing the number of <a href="#item-resource">§3.1 Item resource</a> entities currently stored in the register.
* `total-entries`: An <a href="#integer-datatype">§8.3 Integer datatype</a> value representing the number of <a href="#entry-resource">§3.2 Entry resource</a> entities currently stored in the register.
* `total-records`: An <a href="#integer-datatype">§8.3 Integer datatype</a> value representing the number of <a href="#record-resource">§3.3 Record resource</a> entities currently stored in the register.

***
**EXAMPLE:**

```json
{
  "domain": ".register.gov.uk",
  "last-updated": "2016-01-21T21:09:59Z",
  "register-record": {
    "entry-number": "12",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "item-hash": "sha-256:d9178efd8febfebaaa42968648b7bdd023369c7f",
    "fields": [ "address", "end-date", "school", "start-date", "name", "website" ],
    "name": "Schools in the UK",
    "phase": "beta",
    "register": "school",
    "registry": "department-of-education",
    "start-date": "2012-01-01"
  },
  "total-entries": "109001",
  "total-items": "109009",
  "total-records": "30522"
}
```
***
