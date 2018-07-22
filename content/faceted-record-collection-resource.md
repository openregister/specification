---
id: faceted-record-collection-resource
title: List faceted records
url: /resources/list-faceted-records/
status: wip
---

### Faceted records resource

* Path: `/records/{field-name}/{field-value}`

All <a href="#record-resource">§3.3 Record resource</a>s in a register which
have the same value in the given field.

***
**EXAMPLE:**

```http
GET /records/religious-character/Quaker.json HTTP/1.1
Host: school.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "123278": {
    "index-entry-number": "18371",
    "entry-number": "18371",
    "entry-timestamp": "2016-01-01T00:00:00Z",
    "item": [
        {
          "address": "10011891998",
          "maximum-age": "18",
          "minimum-age": "2",
          "name": "Sibford School",
          "religious-character": "Quaker",
          "school": "123278",
          "start-date": "1945-01-01",
          "website": "http://www.sibford.oxon.sch.uk"
        }
    ]
  },
  "121728": {
    "index-entry-number": "17164",
    "entry-number": "17164",
    "entry-timestamp": "2016-01-01T00:00:00Z",
    "item": [
        {
          "address": "200004778207",
          "end-date": "2006-02-28",
          "headteacher": "Mrs S Ratcliffe",
          "name": "Boothan Junior School",
          "religious-character": "Quaker",
          "school": "121728",
          "start-date": "1957-10-21",
          "website": "http://www.bootham.york.sch.uk/ebor"
        }
    ]
  }
}
```
***
