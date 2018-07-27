---
id: consistency-proof-def
title: Consistency proof
url: /glossary/consistency-proof/
status: wip
---

***
NOTE: See the [Auditability section](/auditability/) to learn more about
digital proofs.
***

***
TODO: Review
***

A **consistency proof** proves the append-only property of a register.

The consistency proof for a register containing total-entries-2 entries and a
previous version of the same register containing total-entries-1 entries
(total-entries-2 > total-entries-1) is the information required to prove that
the first total-entries-1 entries are equal for both, given a [Register proof
](/glossary/register-proof) for each version of the register.

The important characteristic of a consistency proof between two versions of a
register is that the client does not need to download the entirety of either
to verify consistency between the two.

There may be different kinds of consistency proof available.




