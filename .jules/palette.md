## 2023-10-25 - Custom Typography Labels Need Explicit Bindings
**Learning:** In this design system, custom typography labels often use `<label>` tags but lack `htmlFor` attributes and corresponding input `id` bindings, breaking click-to-focus and screen reader context.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs using `htmlFor` and `id` to ensure accessibility and proper click-to-focus behavior.
