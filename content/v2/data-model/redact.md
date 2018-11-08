---
id: v2-redact
title: Redact
url: /v2/data-model/redact
version: v2
---

In rare situations data needs to be removed from a Register. For example, due
to a GDPR request to be forgotten. The [blob hashing](/v2/glossary/blob#hash)
algorithm provides a mechanism to redact a value keeping the rest of values
available and the Register integrity intact.

***
**WARNING:**

Data redaction does not apply to [entries](/v2/glossary/entry) or any part of the
Register other than [blobs](/v2/glossary/blob). Otherwise, the
[integrity](/v2/data-model/audit) of the Register would be compromised.
***

In order to redact a value, you have to replace it with its hash according to
the [blob hashing](/v2/glossary/blob#hash) algorithm and prepend `**REDACTED**`
to the string hexadecimal representation.

Check the [blob](/v2/glossary/blob) section for more details.

There is no specific mechanism to redact an entire blob of data, to achieve
that you MUST redact each value independently.

***
**EXAMPLE:**

For example, to fully redact the following blob of data:

```elm
Blob
  [ ("foo", "abc")
  , ("bar", "xyz")
  ]
```

You have to hash each value like:

```elm
Blob
  [ ("foo", "**REDACTED**12202a42a9c91b74c0032f6b8000a2c9c5bcca5bb298f004e8eff533811004dea511")
  , ("bar", "**REDACTED**12200324894df5a397ab53736bf0d01f4063507acceab19d4ce74c9282de21dadffb")
  ]
```
***
