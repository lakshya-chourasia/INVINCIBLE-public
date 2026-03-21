## 2024-05-17 - Form Label Association
**Learning:** The JoinCollective form lacked standard accessibility associations (id/htmlFor) between labels and inputs, a common oversight in rapid prototyping that breaks screen reader support and reduces click targets.
**Action:** When adding new forms or reviewing existing ones, ensure every input has a unique `id` explicitly linked to its `label` via `htmlFor`.
