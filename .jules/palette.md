## 2024-06-23 - Form label accessibility in JoinCollective page
**Learning:** The Join Collective page uses standard `<label>` tags but lacks `htmlFor` bindings to the inputs, which degrades accessibility by preventing click-to-focus and screen reader association.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs by adding `htmlFor` to the `<label>` and a matching `id` to the `<input>`.
