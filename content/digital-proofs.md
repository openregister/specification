---
id: auditability
title: Auditability
url: /auditability/
status: exp
---

The mechanism for proving the integrity of a Register is based on the digital
proofs defined by the [Certificate Transparency](@rfc6962) data structures
(section 1.2) and cryptographic components (section 2).

***
NOTE: You may read the [Verifiable Data Structures](https://github.com/google/trillian/blob/master/docs/VerifiableDataStructures.pdf) paper,
 the [Revocation Transparency](https://github.com/google/trillian/blob/master/docs/RevocationTransparency.pdf) paper and
the [Certificate Transparency site](https://www.certificate-transparency.org/)
to acquaint yourself with the topic.
***

***
TODO: Add an overview with perhaps a few diagrams of what does it mean to
audit a Register. Or enhance each verification section.
***


## Digital proofs

There are a few types of digital proofs, each one of them supports proving a
different trait on a Register. The “Register proof” to [verify the
register](#register-verification), the “Entry proof” to [verify an entry in
the log](#entry-verification) and the “Consistency proof” to [verify that two
registers are consistent with each other](#consistency-verification).


## Register verification

The Register verification process allows proving that a copy of a Register is
exactly the same as the original one.

***
TODO: Define and link “root hash” (and Merkle tree).
***

A client MUST be able to do the following:

1. Get a copy of a Register (i.e. Entries and Items).
2. Get the Register proof.
   and items?
3. Compute the root hash the log of entries.
4. Sign the root hash with the Register public key.
5. Verify the root hash is the same as the root hash part of the Register
   proof.
6. Verify the signed root hash is the same as the [signed root
   hash](#signed-tree-head) part of the Register proof.
7. Verify that for each Item reference in each Entry there is an Item.

***
TODO: Can (2) be obtained atomically with (1)?
***

***
TODO: Isn't (5) implied if (6) succeeds?
***

***
TODO: The reference implementation doesn't provide signatures nor public keys.
How does this affect our planning to align spec and impl?
***

***
TODO: How does (7) work with “Redaction by blob removal”?
***


## Entry verification

The Entry verification process allows proving that a copy of an entry exists in
the (original) Register.

A client MUST be able to do the following:

1. Given a copy of an entry,
2. and the log size (total number of entries).
3. Get the Entry proof.
4. Compute the root hash from the Entry and the audit path.
5. Verify the root hash is the same as the root hash found in the Entry proof.
6. Verify the signed root hash is the same as the [signed root
   hash](#signed-tree-head) found in the Entry proof.

***
TODO: (4) Define “audit path” or “merkle audit path”.
***

***
TODO: Clarify what is actually need in terms of (2) and why the original
explanation requires a register proof log size.
***

***
TODO: Reubicate

The merkle-audit-path for the entry from the Entry proof resource provides the
shortest list of additional nodes in the Merkle tree required to compute the
Merkle tree root hash.
***


## Consistency verification

***
TODO: Review
***

The merkle-consistency-nodes from the <a
href="#consistency-proof-resource">§3.7 Consistency proof resource</a> for two
versions of a register provides the list of nodes in the Merkle tree required
to verify that the first n entries (where n is the number of entries in the
smaller register) are equal in both registers.

To verify the consistency of two versions of a register, given that
total-entries-1 and total-entries-2 of the <a
href="#consistency-proof-resource">§3.7 Consistency proof resource</a> equal
the total-entries of each <a href="#register-proof-resource">§3.5 Register
proof resource</a>, the client must prove that the root-hash of the <a
href="#register-proof-resource">§3.5 Register proof resource</a> for the
larger register can be computed using the set of consistency-proof-nodes and
that the root-hash of the <a href="#register-proof-resource">§3.5 Register
proof resource</a> for the smaller register can be computed using a subset of
the same consistency-proof-nodes, as per <a data-link-type="biblio"
href="#biblio-rfc6962">[RFC6962]</a> section 2.1.2. The client must also
verify the corresponding <a href="#signed-tree-head">§12.1.2 Signed tree
head</a> against each root-hash using a public key.

## Record collection verification

***
TODO:
***

## Record verification

***
TODO:
***


## Entry hash

***
TODO: Move elsewhere
***

The entry hash is the application of a supported hashing algorithm on the data
contained in the [Entry resource](/resources/entry-resource/). The [hash
datatype](/datatypes/hash/) of the entry, rather than the item itself ([Item
resource](/resources/item-resource/)), is part of the raw data hashed to
create the entry hash.

The entry hash is required for many operations in Certificate Transparency.

## Signed tree head

***
TODO: Move elsewhere
***


The signed tree head for a register is the tree-head-signature property of the
[Register proof resource](/resources/register-proof-resource/), where the
proof-identifier is specified as merkle:sha-256.

The signed tree head for a register is the signed Merkle tree root hash
([RFC6962](@rfc6962) section 2.1) of a Merkle tree containing all entries
in the register. The corresponding root-hash is also a property of the
[Register proof resource](/resources/register-proof-resource/).


