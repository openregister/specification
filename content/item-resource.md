---
id: item-resource
title: Item resource
url: /resources/item-resource/
---

### Item resource


* Path: `/items/{item-hash}`
* Parameters:
  * `item-hash`: Item addressable identifier.

An item is an unordered collection of <a href="#fields">§9 Fields</a> and
values.

The set of fields which MAY be included in an item are defined in the
`fields` field in the <a href="#register-register">§10.1 Register
register</a> entry for the register.

An item is identified by the globally unique <a href="#item-hash-field">§9.7
item-hash</a> calculated from its contents. Changing the item data changes the
<a href="#item-hash-field">§9.7 item-hash</a>.

---

**Example**

The following example shows an item in the JSON representation:

```http
GET /items/sha-256:bdc7f29f7d2ef36f9db1ec7b4141286288a1bd79254d59b46f3a8baa3484f858 HTTP/1.1
Host: food-premises.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "business": "company:07228130",
  "food-premises": "788112",
  "food-premises-types": ["restaurant", "cafe"],
  "local-authority": "E09000015",
  "name": "Roy’s Rolls",
  "premises": "13456079000",
  "start-date": "2015-03-01"
}
```
