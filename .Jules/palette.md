## 2026-02-16 - [Form Label Associations]
**Learning:** Found an accessibility issue pattern in the `JoinCollective` component where form labels were lacking `htmlFor` attributes, and corresponding inputs were missing `id` attributes. This prevented screen readers from associating the labels with the inputs, and didn't allow users to click the labels to focus the inputs.
**Action:** Ensure all new forms include explicit `htmlFor` and `id` associations between labels and their corresponding input fields to support accessibility.
