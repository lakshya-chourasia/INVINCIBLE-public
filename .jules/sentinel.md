## 2025-02-24 - [Information Leakage in Error Handling]
**Vulnerability:** Supabase initialization/query error messages were being leaked to the frontend UI through the `err.message` variable inside `SubPages.tsx` when a user submitted the node initialization form.
**Learning:** Returning `err.message` from backend API failures to the frontend UI can expose sensitive internals or database implementation details.
**Prevention:** Always log original error trace messages securely internally (e.g., `console.error`) while returning safe, generic error statements to the UI (e.g., "Synchronization failed").
