---
id: digital-proofs
title: Digital proofs
url: /digital-proofs/
status: exp
---

## Digital Proofs

### Certificate transparency

Certificate Transparency <a data-link-type="biblio"
href="#biblio-rfc6962">[RFC6962]</a> is one of a number of possible methods of
proving the integrity of a register.

#### Entry hash

The entry hash is the application of a supported hashing algorithm on the data
contained in the <a href="#entry-resource">§3.2 Entry resource</a>. The <a
href="#item-hash-datatype">§8.11 Item-hash datatype</a> of the entry, rather
than the item itself (<a href="#item-resource">§3.1 Item resource</a>), is
part of the raw data hashed to create the entry hash.

The entry hash is required for many operations in Certificate Transparency.

#### Signed tree head

The signed tree head for a register is the tree-head-signature property of the
<a href="#register-proof-resource">§3.5 Register proof resource</a>, where the
proof-identifier is specified as merkle:sha-256.

The signed tree head for a register is the signed Merkle tree root hash (<a
data-link-type="biblio" href="#biblio-rfc6962">[RFC6962]</a> section 2.1) of a
Merkle tree containing all entries in the register. The corresponding
root-hash is also a property of the <a href="#register-proof-resource">§3.5
Register proof resource</a>.

#### Verifying the register

To verify a register obtained from the <a href="#download">§6.1 Download
resource</a>, a client must compute the Merkle tree root hash from the
complete list of raw <a href="#entry-resource">§3.2 Entry resource</a>, as per
<a data-link-type="biblio" href="#biblio-rfc6962">[RFC6962]</a> section 2.1,
ensuring that it equals the root-hash of the <a
href="#register-proof-resource">§3.5 Register proof resource</a> and that the
same <a href="#signed-tree-head">§12.1.2 Signed tree head</a> can be generated
by signing the root-hash against a public key.

The client must also verify that for each <a href="#entry-resource">§3.2 Entry
resource</a> in the register there exists an item with the corresponding <a
href="#item-hash-datatype">§8.11 Item-hash datatype</a> and that the contents
of the item generate the correct <a href="#item-hash-datatype">§8.11 Item-hash
datatype</a>.

#### Verifying an entry

The merkle-audit-path for the entry from the <a
href="#entry-proof-resource">§3.6 Entry proof resource</a> provides the
shortest list of additional nodes in the Merkle tree required to compute the
Merkle tree root hash.

To verify an entry exists in a register, given that total-entries of the <a
href="#entry-proof-resource">§3.6 Entry proof resource</a> equals the
total-entries of the <a href="#register-proof-resource">§3.5 Register proof
resource</a>, a client must combine the hash of the entry with each Merkle
tree node in the merkle-audit-path consecutively, as per <a
data-link-type="biblio" href="#biblio-rfc6962">[RFC6962]</a> section 2.1.1,
and verify that the resulting Merkle tree root hash is equal to the root-hash
of the <a href="#register-proof-resource">§3.5 Register proof resource</a>.
The client should also verify the <a href="#signed-tree-head">§12.1.2 Signed
tree head</a> against the computed root-hash using a public key.

#### Verifying consistency

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

#### Verifying the records

#### Verifying a record


