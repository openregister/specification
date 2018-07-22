---
id: introduction
title: Introduction
url: /introduction/
status: wip
---

## Abstract

This document defines the resources and representations which together provide
an Application Programming Interface (API) for accessing data held in a
register.

## Conformance

Conformance requirements are expressed with a combination of descriptive
assertions and RFC 2119 terminology.  The key words “MUST”, “MUST NOT”,
“REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”,
“MAY”, and “OPTIONAL” in the normative parts of this document are to be
interpreted as described in RFC 2119.  However, for readability, these words
do not appear in all uppercase letters in this specification.

All of the text of this specification is normative except sections explicitly
marked as non-normative, examples, and notes. <a data-link-type="biblio"
href="#biblio-rfc2119">[RFC2119]</a>

Examples in this specification are introduced with the words “for example” or
are set apart from the normative text with <code>class="example"</code>, like
this:

<div class="example" id="example-example"><a class="self-link" href="#example-example"></a> This is an example of an informative example. </div>

Informative notes begin with the word “Note” and are set apart from the
normative text with <code>class="note"</code>, like this:

<p class="note" role="note"> Note, this is an informative note. </p>

## Infoset

An infoset is an unordered collection of data items.

---

**NOTE:** Data items in this specification are defined in terms of an
information set which can be mapped to one of a number of different
representations. There is no canonical representation.

---


* A data item is identified within the scope of the infoset by a <a href="#field-field">field</a> value.
* The contents of a data item is constrained by one of a number of different <a href="#datatypes">§8 Datatypes</a>.

---

**ISSUE**: [40](https://github.com/openregister/specification/issues/40) possible confusion: "data item" and "item" mean different things.

---

## Immutable resources

An immutable resource, is one whose contents will never change.

An instance of an <a href="#item-resource">§3.1 Item resource</a> and an <a
href="#entry-resource">§3.2 Entry resource</a> are both deemed to be
immutable.
