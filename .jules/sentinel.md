## 2024-06-12 - Information Leakage in Form Error Handling
**Vulnerability:** Supabase database errors (like `err.message`) were directly passed to the frontend state (`setError`) inside a catch block typed as `any`.
**Learning:** Returning backend stack traces or raw database error strings to the UI can expose sensitive internals or database schema details to malicious actors. Additionally, using `any` circumvents TypeScript's safety mechanisms.
**Prevention:** Always use `catch (err: unknown)` for caught errors and return a generic, static error string (e.g., "Synchronization failed.") to the user interface instead of bubbling up the raw exception.
