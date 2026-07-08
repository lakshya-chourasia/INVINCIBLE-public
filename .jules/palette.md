## 2024-07-08 - Custom Typography Label Bindings
**Learning:** In this design system, custom typography components often use `<label>` tags for visual styling but omit `htmlFor` bindings, breaking click-to-focus and screen reader context for corresponding inputs.
**Action:** Always verify and explicitly add `htmlFor` to labels and `id` to inputs in custom form implementations.
