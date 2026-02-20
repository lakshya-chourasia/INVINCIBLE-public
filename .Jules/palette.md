# Palette's Journal - Critical UX Learnings

## 2024-05-23 - Form Accessibility Basics
**Learning:** Found critical form fields in `JoinCollective` missing basic accessibility attributes (`htmlFor`, `id`, `autoComplete`). This pattern likely exists because the custom styling focuses on visual hierarchy ("usr_name*", "net_address*") over semantic structure.
**Action:** When creating custom-styled forms, always start with semantic HTML (label+input association) before applying utility classes. Add standard `autoComplete` attributes even for "futuristic" fields to support browser autofill.
