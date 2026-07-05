## 2025-03-09 - Bind Custom Labels to Inputs
**Learning:** Custom typography labels in this design system use <label> tags but frequently lack htmlFor attributes and input id bindings, breaking click-to-focus functionality and screen reader context for form fields.
**Action:** Always explicitly provide an id to input elements and a matching htmlFor to the corresponding label tags to preserve WCAG 1.3.1 Info and Relationships and click-to-focus.
