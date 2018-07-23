---
id: introduction
title: Introduction
url: /introduction/
status: wip
---

This document defines the data model, representations and HTTP interface for
accessing data held in a register.


## Background

_This section is non-normative._

Back in 2015 a team at
[GDS](https://www.gov.uk/government/organisations/government-digital-service)
started exploring how to improve digital registers. A few blog posts from then
can help provide some background for where is this specification coming from.

* [Building on the steel thread](https://gds.blog.gov.uk/2015/07/24/building-on-the-steel-thread/).
* [Registers: authoritative lists you can trust](https://gds.blog.gov.uk/2015/09/01/registers-authoritative-lists-you-can-trust/).
* [The characteristics of a register](https://gds.blog.gov.uk/2015/10/13/the-characteristics-of-a-register/).
* [Linking registers](https://gds.blog.gov.uk/2015/12/16/linking-registers/).


## Audience

_This section is non-normative._

This specification is intended for implementers of the Register API or tools
that operate on the Register API.

This specification is probably not suited to readers who need to consume data
from an existing register. More approachable tutorials and guides can provide
a gentler introduction to the topic.

***
TODO: The above could link to a tutorial or API docs.
***


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
[RFC2119](@rfc2119). For readability, these words do not appear in all uppercase
letters in this specification.

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
**ISSUE:** [40](https://github.com/openregister/specification/issues/40) This
is an issue.
***


## Suggested reading

***
TODO: Select a few biblio relevant to put in here. E.g. Certificate
Transparency website or RFC
***
