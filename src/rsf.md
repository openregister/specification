# The Register Serialisation Format

## Abstract

The Register Serialisation Format, from now on RSF, is an event log describing
the evolution of the Register data and metadata.


### RSF Grammar

RSF is a positional line-based textual format separated by tabs. Each
line defines a command to apply to a Register state to obtain the next state.

This specification uses the Augmented Backus-Naur Form (ABNF) as defined by
[RFC5234](https://tools.ietf.org/html/rfc5234) and refined by
[RFC7405](https://tools.ietf.org/html/rfc7405). It assumes the following
definitions:

* RFC5234: `ALPHA` (letters), `CRLF` (carriage return, line feed), `DIGIT`
  (decimal digits), `HEXDIG` (hexadecimal digits) and `HTAB` (horizontal tab).
* Registers specification: [`CANONREP`][canon-rep] (canonical representation).
  Note that, in turn, it depends on [RFC8259](https://tools.ietf.org/html/rfc8259).

```abnf
log              = command *(CRLF command) [CRLF]
command          = add-item / append-entry / assert-root-hash

assert-root-hash = %s"assert-root-hash" HTAB hash

add-item         = %s"add-item" HTAB CANONREP

append-entry     = %s"append-entry" HTAB type HTAB key HTAB timestamp HTAB hash-list
type             = "user" / "system"
key              = alphanum / %x2D / %x5F
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

## <a id="assert-root-hash-command">`assert-root-hash` command</a>

TODO

## <a id="add-item-command">`add-item` command</a>

Adds a new [Item resource][item-res] to the register. It will require an
[`append-entry` command](#append-entry-command) to make it visible to users.

This event expects one argument:

1. The [canonical representation][canon-rep] of the item.

For exeample:

```
add-item	{"country":"GB","name":"United Kingdom","official-name":"The United Kingdom of Great Britain and Northern Ireland"}
```

## <a id="append-entry-command">`append-entry` command</a>

Appends a new [Entry resource][entry-res] to the register.

This event expects four arguments:

TODO: Link to the Spec when appropriate

1. The `type` of the entry determines if the entry belongs to the data log
   (`user`) or to the metadata log (`system`).
2. The `key` of the entry. The primary key field is the field with the same
   name as the register.
3. The `timestamp` of the entry. This is the time at which the entry was
   appended to the register.
4. The `hash` of the item for which the entry was appended. This is the
   [sha-256 hash of the item][canon-rep].

For example:

```
append-entry	user	GB	2010-11-12T13:14:15Z sha-256:08bef0039a4f0fb52f3a5ce4b97d7927bf159bc254b8881c45d95945617237f6
```

## Rules

A RSF list of commands is expected to conform to the following rules:

* [Commands](#commands) are executed in order of appearance, top to bottom.
* Entries are numbered in sequence in order of appearance starting with 1 if
  the register is empty, otherwise incrementing on the latest entry number
  found in the register.
* An [`append-entry` command](#append-entry-command) must always appear after
  the [`add-item` command](#add-item-command) that introduces the item is
  referencing.
* It is illegal to have orphan items. An `add-item` must have at least one
  `append-entry` referencing to the item.
* It is illegal to have broken references. An `append-entry` must reference an
  item previously introduced by an `add-item` command.
* The item in the `add-item` command must always be in the canonical form.

## Examples

### Simple RSF

```
add-item	{"country":"GB","name":"United Kingdom","official-name":"The United Kingdom of Great Britain and Northern Ireland"}
append-entry	user	GB	2010-11-12T13:14:15Z sha-256:08bef0039a4f0fb52f3a5ce4b97d7927bf159bc254b8881c45d95945617237f6
```

## Glossary

* [item-res]: https://openregister.github.io/specification/#item-resource
* [entry-res]: https://openregister.github.io/specification/#entry-resource
* [canon-rep]: https://openregister.github.io/specification/#sha-256-item-hash

