## 2025-02-25 - Prevent Database Error Leakage to UI

**Vulnerability:** The application was catching database insertion errors and exposing the raw `err.message` directly to the client UI.
**Learning:** This is a common pattern where backend components seamlessly leak technical implementation details (like database constraints, table names, or structure) under failure conditions, directly compromising system obscurity.
**Prevention:** Always sanitize caught exceptions at the boundary of the presentation layer. Use a generic, user-friendly fallback message for UI state, and keep raw error details constrained to secure, backend or local console logging exclusively.
