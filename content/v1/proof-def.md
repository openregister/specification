---
id: digital-proof-def
title: Digital proof
url: /glossary/digital-proof
version: v1
status: exp
---

## Register proof

A **register proof** is a digitally-signed demonstration of the integrity of all
entries in a register. Given a register proof, it is possible to verify that
all of the entries and blobs are correct, and that the entries are in the
correct order.

## Consistency proof

A **consistency proof** proves the append-only property of a register.

The consistency proof for a register containing `m` entries and a previous
version of the same register containing `n` entries is the information
required to prove that the first `n` entries are equal for both, given a
[Register proof ](#register-proof) for each version of the register.

A consistency proof does not require to get the entirety of either logs to
verify the consistency between the two.


## Entry proof

An **entry proof** is the information required to prove the integrity of a single
entry within a register of a given [log](/v1/glossary/log) size, given a [Register
proof](#register-proof).

An entry proof does not require a client to get the entire register to verify
the integrity of a single entry.


## Root hash

The **root hash** for a register is the Merkle tree root hash
([RFC6962](@rfc6962) section 2.1) of a Merkle tree containing all entries in
the register.


## Signed tree head

The **signed tree head** for a register is the signed Merkle tree root hash
([RFC6962](@rfc6962) section 2.1) of a Merkle tree containing all entries
in the register.


## Audit path

The **audit path** provides the shortest list of additional nodes in the Merkle
tree required to compute the Merkle tree **root hash**.



