## 2025-03-09 - Ensure custom typography labels bind to form inputs
**Learning:** In this design system, custom typography labels often use `<label>` tags but lack `htmlFor` attributes and corresponding input `id` bindings. This breaks the click-to-focus behavior and removes the screen reader context for form inputs.
**Action:** Always explicitly bind visual text elements acting as labels to their corresponding form inputs using `htmlFor` and `id` attributes to ensure WCAG compliance and optimal user experience.
