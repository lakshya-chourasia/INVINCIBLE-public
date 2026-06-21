## 2025-06-21 - [Properly Associate Labels with Inputs]
**Learning:** In custom forms using basic `<label>` and `<input>` tags, failure to explicitly bind them via `htmlFor` and `id` breaks accessibility tools and click-to-focus behavior. While visually identical, structurally disconnected labels fail WCAG standards.
**Action:** Always ensure any `<label>` element includes an `htmlFor` attribute that strictly matches the `id` of its corresponding interactive input element to maintain proper DOM association and a11y compliance.
