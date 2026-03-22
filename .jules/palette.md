## 2024-03-22 - [Form Accessibility Improvements]
**Learning:** Found that custom forms often lack basic label-to-input linkage (missing `htmlFor` and `id` pairs) and explicit error announcement roles (`role="alert"`), forcing assistive technologies to guess the context and failing to announce dynamic errors.
**Action:** When inspecting forms, immediately check for explicit label associations. Additionally, ensure dynamic error messages use `role="alert"` so they are announced by screen readers as soon as they appear in the DOM.
