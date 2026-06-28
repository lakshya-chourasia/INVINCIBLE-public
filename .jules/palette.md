## 2024-06-28 - Explicit Form Label Bindings
**Learning:** In this design system, custom typography labels often use `<label>` tags but lack `htmlFor` attributes and corresponding input `id` bindings, breaking click-to-focus and screen reader context.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs by adding matching `htmlFor` and `id` attributes.
