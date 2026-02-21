## 2025-02-12 - Scoped IDs for Accessible Forms
**Learning:** Using generic IDs like `name` or `email` in React components can lead to duplicate ID conflicts if multiple forms coexist (e.g., signup modal vs. contact form), breaking accessibility references (`htmlFor`).
**Action:** Always scope form input IDs (e.g., `join-name`, `login-email`) to ensure unique references within the DOM.
