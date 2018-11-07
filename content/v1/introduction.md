---
id: introduction
title: Introduction
url: /introduction
version: v1
---

This specification defines the [data model](/v1/data-model) and [HTTP
interface](/v1/rest-api) for accessing the data held in a [System of
Record](https://en.wikipedia.org/wiki/System_of_record), the “Register”.

## Background

_This section is non-normative._

Back in 2015 a team at
[GDS](https://www.gov.uk/government/organisations/government-digital-service)
started exploring how to improve digital registers. A few blog posts from then
can help provide some background for where is this specification comes from.

* [Building on the steel thread](https://gds.blog.gov.uk/2015/07/24/building-on-the-steel-thread).
* [Registers: authoritative lists you can trust](https://gds.blog.gov.uk/2015/09/01/registers-authoritative-lists-you-can-trust).
* [The characteristics of a register](https://gds.blog.gov.uk/2015/10/13/the-characteristics-of-a-register).
* [Guaranteeing the integrity of a register](https://gdstechnology.blog.gov.uk/2015/10/13/guaranteeing-the-integrity-of-a-register).
* [Linking registers](https://gds.blog.gov.uk/2015/12/16/linking-registers).


## Audience

_This section is non-normative._

This specification is intended for implementers of the Register API or tools
that operate on the Register API.

This specification is probably not suited to readers who need to consume data
from an existing register. More approachable tutorials and guides can provide
a gentler introduction to the topic.


## Scope

_This section is non-normative._

The scope of this specification is to define the interfaces to interact with a
Register and not how to implement them. When seen adequate a non-normative
description may be provided to explain how the reference implementation has
addressed a topic.


## Conformance requirements

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in the
normative parts of this document are to be interpreted as described in
[RFC2119](@rfc2119).

All diagrams, examples, and notes in this specification are non-normative, as
are all sections explicitly marked non-normative. Everything else in this
specification is normative.

Examples in this specification are introduced with the words “for example“ or
are set apart from the normative text with a block leaded by a label
“EXAMPLE”, like this:

***
**EXAMPLE:**

This is an example of an informative example with a code block as guidance:

```elm
f : a -> b
```
***

Informative notes begin with the label “NOTE” and are set apart from the
normative text like this:

***
NOTE: This is an informative note.
***

Informative warnings begin with the label “WARNING” and are set apart from the
normative text like this:

***
**WARNING:** This is an informative warning.
***

Informative issue blocks begin with the label “ISSUE” and are set apart from
the normative text like this:

***
**ISSUE:** [#40](https://github.com/openregister/specification/issues/40) This
is an issue.
***

Experimental features are tagged as **EXPERIMENTAL** like this:

***
**EXPERIMENTAL:**

This is an experimental paragraph
***

A feature tagged as **EXPERIMENTAL** means the feature is being studied and it
is likely to evolve possibly with breaking changes.

Informative type and function definitions may be expressed in a syntax
inspired by the family of ML languages like Haskell or Elm.

A type:

```elm
type Log =
  List Entry
```

A function signature that reads “A function `f` has two parameters `a` and `b`
and returns `c`”:

```elm
f : a -> b -> c
```

These types and signatures are mainly to support the narrative of this
specification and interlink the different concepts in play.

## Versioning

This specification aims to evolve with changes that are backwards compatible.
Once that is not possible, a new version will be introduced.

## Reference implementation

_This section is non-normative._

This specification is tested and validated by implementing every feature
defined in it in the [reference
implementation](https://github.com/openregister/openregister-java).

Also, you can use the [conformance test suite](https://github.com/openregister/conformance-test)
to test your implementation.


## Suggested reading

_This section is non-normative._

The following documents might be of interest to readers of this specification.

### [Certificate Transparency](https://www.certificate-transparency.org)

> Google's Certificate Transparency project fixes several structural flaws in
> the SSL certificate system, which is the main cryptographic system that
> underlies all HTTPS connections.

### [Verifiable Data Structures](https://github.com/google/trillian/blob/master/docs/VerifiableDataStructures.pdf)

> This paper describes a number of data structures and their applications that
> allow adding transparency to the trust model, allowing an ecosystem to evolve
> from pure trust, to trust but verify. By adding transparency to services,
> trust can be verified by the ecosystems that depend upon them.

### [Revocation Transparency](https://github.com/google/trillian/blob/master/docs/RevocationTransparency.pdf)

> Like Certificate Transparency, only for revocation. Unlike CT, RT needs a
> recent status for the certificate, so the general idea is that client will
> somehow obtain and check a recent proof from the log - for example the server
> could retrieve it from the log regularly and serve that along with the
> certificate, or clients could be sent the entire revocation list.

### [DAT project](https://docs.datproject.org)

> People often are stuck choosing between security, speed, or ease of use. Dat
> provides all three by using a state of the art technical foundation and user
> friendly tools for fast and encrypted file sharing that you control.
