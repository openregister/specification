---
id: digital-proof-def
title: Digital proof
url: /glossary/digital-proof/
status: wip
---

***
NOTE: See the [Auditability section](/auditability/) to learn more about
digital proofs.
***


## Register proof

***
TODO: Review
***

A register proof is a digitally-signed demonstration of the integrity of all
of the entries in a register.  Given a register proof, it is possible to
verify that all of the entries and items are correct, and that the entries are
in the correct order.

***
TODO: Is this still wanted? It causes indefinition in the specification and
users of multiple registers from different sources would need to explore the
register before being able to use it.

There may be different kinds of register proof available. The exact structure
of the proof will depend on the proof algorithm in use.  The algorithm is
identified by a proof-identifier.
***

***
TODO: Proofs should be signed or at least it should be recommended.
***


## Consistency proof

***
TODO: Review
***

A **consistency proof** proves the append-only property of a register.

The consistency proof for a register containing total-entries-2 entries and a
previous version of the same register containing total-entries-1 entries
(total-entries-2 > total-entries-1) is the information required to prove that
the first total-entries-1 entries are equal for both, given a [Register proof
](#register-proof) for each version of the register.

The important characteristic of a consistency proof between two versions of a
register is that the client does not need to download the entirety of either
to verify consistency between the two.

There may be different kinds of consistency proof available.


## Entry proof

***
TODO: Review
***

An **entry proof** is the information required to prove the integrity of a single
entry within a register of size total-entries, given a [Register
proof](#register-proof).

The important characteristic of an entry proof is that it means the client
does not need to download the entire register just to verify the integrity of
a single entry.

There may be different kinds of entry proof available.

