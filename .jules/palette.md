
## 2024-06-13 - Form Label Associations
**Learning:** In this design system, custom typography labels often use `<label>` tags but lack `htmlFor` attributes and corresponding input `id` bindings, breaking click-to-focus and screen reader context.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs using `htmlFor` and `id`.
