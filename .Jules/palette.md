## 2024-04-26 - Form Accessibility Fixes
**Learning:** Custom styled React forms using structural divs rather than semantic form elements often sever the implicit association between text labels and input elements, rendering them inaccessible to screen readers.
**Action:** Always verify that `<label>` tags explicitly use the `htmlFor` attribute mapped to the corresponding `<input>` element's `id`. Additionally, ensure dynamically rendered error messages or state updates use `role="alert"` and `aria-live="polite"` so they are announced without disrupting the user's flow.
