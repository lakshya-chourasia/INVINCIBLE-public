## 2025-03-09 - Form Input Accessibility
**Learning:** Custom styled forms in this design system often use visual typography for labels but detach them from the actual input elements by missing `htmlFor` and `id` attributes. This breaks click-to-focus behavior and screen reader context.
**Action:** Always ensure custom text elements acting as labels are explicitly bound to their corresponding form inputs using `htmlFor` and `id` properties.
