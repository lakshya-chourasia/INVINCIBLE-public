## 2024-05-24 - [Fix Missing Form Input Bindings]
**Learning:** In this custom design system, typographic labels are often visually styled but lack the semantic `htmlFor` binding to their corresponding input `id`s. This breaks click-to-focus behavior and leaves screen reader users without proper field context.
**Action:** Always ensure custom `<label>` tags explicitly bind to inputs using `htmlFor` and `id` attributes, even when relying on surrounding visual structure for layout.
