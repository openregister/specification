# The Register Serialisation Format

The Register Serialisation Format, from now on RSF, is an event log describing
the evolution of the Register data and metadata.

RSF is a positional line-based textual format separated by tabs `\t`. Each
command accepts a different number of arguments but the general is:

```
[command]	[arg	...]
```

### RSF Grammar

This specification uses the Augmented Backus-Naur Form (ABNF) as defined by
[RFC5234](https://tools.ietf.org/html/rfc5234) and refined by
[RFC7405](https://tools.ietf.org/html/rfc7405). It assumes the following
definitions:

* RFC5234: `ALPHA` (letters), `CRLF` (carriage return, line feed), `DIGIT`
  (decimal digits), `HEXDIG` (hexadecimal digits) and `HTAB` (horizontal tab).
* Registers specification: [`CANONREP`][canon-rep] (canonical representation).
  Note that, in turn, it depends on [RFC8259](https://tools.ietf.org/html/rfc8259).

```abnf
rsf-document     = command *(CRLF command) [CRLF]
command          = add-item / append-entry / assert-root-hash

assert-root-hash = %s"assert-root-hash" HTAB hash

add-item         = %s"add-item" HTAB CANONREP

append-entry     = %s"append-entry" HTAB type HTAB key HTAB timestamp HTAB hash-list
type             = "user" / "system"
key              = alphanum
hash-list        = hash *(list-separator hash)
hash             = "sha-256:" 64(HEXDIG) ; sha-256
list-separator   = %x3B

alphanum         = ALPHA / DIGIT

;                timestamp
timestamp        = date "T" time
date             = century year DSEP month DSEP day ; date YYYY-MM-DD
time             = hour TSEP minute TSEP second TZ ; time HH:MM:SSZ

;                date
century          = 2DIGIT  ; 00-99
year             = 2DIGIT  ; 00-99
month            = 2DIGIT  ; 01-12
day              = 2DIGIT  ; 01-28, 01-29, 01-30, 01-31 based on month/year
DSEP             = %x2D    ; - date separator

;                time
hour             = 2DIGIT  ; 00-24
minute           = 2DIGIT  ; 00-59
second           = 2DIGIT  ; 00-58, 00-59, 00-60 based on leap-second rules
TSEP             = %x3A    ; : time separator
TZ               = %x5A    ; Z timezone
```


## Commands

* `add-item`
* `append-entry`

## <a id="add-item-command">`add-item` command</a>

Adds a new [Item resource][item-res] to the register. It will require an
[`append-entry` command](#append-entry-command) to make it visible to users.

This event expects one argument:

1. The [canonical representation][canon-rep] of the item.

```
add-item	{"country":"GB","name":"United Kingdom","official-name":"The United Kingdom of Great Britain and Northern Ireland"}
```

## <a id="append-entry-command">`append-entry` command</a>

Appends a new [Entry resource][entry-res] to the register.

This event expects four arguments:

TODO: Link to the Spec when appropriate
1. The `type` of the entry. The value is either `user` or `system`. TODO:
   Define the meaning of values.
2. The `key` of the entry. TODO: Is this in the Spec? The primary key field is the field with the same name as the register.
3. The `entry-timestamp`. This is the time at which the register was appended to
the register in UTC (yyyy-MM-ddThh:mm:ssZ).
The item-hash of the item for which the entry was appended. This is the
sha-256 hash of the canonical item, as documented here -
https://openregister.github.io/specification/#item-hash-datatype. 

For example (the append-entry command that corresponds to the above add-item
command):

```
append-entry	user	GB	2010-11-12T13:14:15Z sha-256:08bef0039a4f0fb52f3a5ce4b97d7927bf159bc254b8881c45d95945617237f6
```


## Glossary

* [item-res]: https://openregister.github.io/specification/#item-resource
* [entry-res]: https://openregister.github.io/specification/#entry-resource
* [canon-rep]: https://openregister.github.io/specification/#sha-256-item-hash

