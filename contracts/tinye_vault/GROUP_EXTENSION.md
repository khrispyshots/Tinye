# Individually owned group goals

The group extension adds no fields to the existing contract or `GoalVault` Borsh state. It uses separate `tinye:groups:v1:{record|member|goal}:…` storage keys, disjoint from the existing collection prefixes. Existing savings balances, operations, access checks and withdrawal callbacks remain unchanged.

- A creator links a personal goal and sets a positive shared progress target.
- The creator must invite a specific NEAR account before it can join. Group IDs and invitations are public on-chain, not secret access tokens.
- Joining links one goal owned by the caller. A goal can belong to only one group; each group supports at most 20 members/invitations and each account at most 20 memberships.
- Group progress sums current individually owned balances, including money saved before joining. It is not pooled money or a cumulative contribution ledger.
- Deposits and withdrawals continue through the existing personal-goal methods. Group creators cannot move members' funds.
- Leaving removes a member from the current group projection without transferring or deleting any savings. The creator must close invitations before leaving, so an open group never loses its only invitation manager from the creator's membership list. Closing invitations prevents joins but leaves personal goals and withdrawals usable.
- Create/join UI attaches 0.02 testnet NEAR and inviting attaches 0.005 as prepaid storage credit. Growth is measured and charged through the existing storage-credit accounting. Leave/close requires exactly one yoctoNEAR. Storage credit is separate from principal; no storage-refund promise is made.

`NEXT_PUBLIC_TINYE_GROUPS_ENABLED` must remain false until the tested extension is deployed and verified. The current deployed artifact must be preserved under its recorded hash; build the extension as a separately named artifact. Do not reinitialise an existing account during an additive upgrade.

Rewards/reputation UI recognises verified current goal state and contract-verified deposit operation IDs from browser history. It discloses incomplete history and does not award unapproved points, claim merchant fulfilment or calculate a credit score.
