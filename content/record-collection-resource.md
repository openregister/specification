### Records resource

* Path: `/records`

All <a href="#record-resource">§3.3 Record resource</a>s in a register.

---
**Example**

```http
GET /records
Host: https://local-authority-eng.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "E09000019": {
    "index-entry-number": "72",
    "entry-number": "72",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000019",
    "item": [
        {
          "local-authority": "E09000019",
          "name": "Islington"
        }
    ]
  },
  "E09000016": {
    "index-entry-number": "76",
    "entry-number": "76",
    "entry-timestamp": "2015-08-20T08:15:30Z",
    "key": "E09000016",
    "item": [
        {
          "local-authority": "E09000016",
          "name": "Havering"
        }
    ]
  }
}
```

---
