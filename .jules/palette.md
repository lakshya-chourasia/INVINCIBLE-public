## 2024-07-06 - Form Label Accessibility
**Learning:** Form fields in this design system often use `<label>` tags without `htmlFor` attributes and matching `id`s on the `<input>` elements, which breaks click-to-focus and screen reader context.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs using `htmlFor` and `id` attributes.