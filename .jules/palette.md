## 2024-03-05 - Form Accessibility Improvements
**Learning:** The JoinCollective form lacked basic label associations (`htmlFor` linking to input `id`), which is a critical a11y issue for screen readers and clicking labels to focus inputs.
**Action:** Always ensure custom styled forms use semantic HTML associations for inputs and labels, especially in design-heavy components where default browser styles are overridden.
