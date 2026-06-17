## 2024-05-18 - Missing htmlFor/id bindings in form labels
**Learning:** Custom typography labels in this design system often use `<label>` tags but lack `htmlFor` attributes and corresponding input `id` bindings, breaking click-to-focus and screen reader context.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs by adding `htmlFor` to the `<label>` and an `id` to the `<input>`.
