# The Register Serialisation Format

The Register Serialisation Format, from now on RSF, is an event log describing
the evolution of the Register data and metadata.

RSF is a positional line-based textual format separated by tabs `\t`. Each
command accepts a different number of arguments but the general is:

```
[event-type]	[arg	...]
```

TODO: Write proper EBNF.


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
append-entry	user	GB	2010-11-12T13:14:15Z	sha-256:76b00a0f779941f0147e18a24b7a52853a89b5d1c11c9b132400dff11a468155
```


## Glossary

* [item-res]: https://openregister.github.io/specification/#item-resource
* [entry-res]: https://openregister.github.io/specification/#entry-resource
* [canon-rep]: http://openregister.github.io/specification/#sha-256-item-hash

