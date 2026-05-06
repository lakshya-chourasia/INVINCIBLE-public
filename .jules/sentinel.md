## 2025-05-06 - Prevent DB Error Leakage and XSS in Form Data
**Vulnerability:** Information Leakage and XSS
**Learning:** Exposing raw database error messages in the UI leaks internal backend structures. Storing unsanitized form data poses XSS risks.
**Prevention:** Always use `err: unknown` in catch blocks, log the real error internally, and show a generic message to the user. Always sanitize and validate user input formats before database insertion.
