---
id: item-resource
title: Item resource
url: /resources/item-resource/
---

* Endpoint: `GET /items/{item-hash}`
* Parameters:
  * `item-hash`: Item identifier.

An **Item resource** represents an [Item](/glossary#item) in the requested
format. The collection of fields and values when represented in a tabular
format like CSV the column order is implementation dependent. For
representations like JSON, the object has to be treated as unordered.

To determine the set of fields and their value types the user SHOULD use the
[Schema resource](/resources/schema-resource/).

***
NOTE: The set of fields MAY be found in the catalogue as well. For example,
the GOV.UK catalogue is the [Register register](https://register.register.gov.uk/).
***

***
**EXAMPLE:**

For example, the following request shows an item in the JSON representation:

```http

GET /items/sha-256:6b18693874513ba13da54d61aafa7cad0c8f5573f3431d6f1c04b07ddb27d6bb HTTP/1.1
Host: country.register.gov.uk
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156

{
  "country":"GB",
  "official-name":"The United Kingdom of Great Britain and Northern Ireland",
  "name":"United Kingdom",
  "citizen-names":"Briton;British citizen"
}
```

