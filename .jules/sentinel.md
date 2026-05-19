## 2024-05-19 - [Fix DB Error Leakage]
**Vulnerability:** Database error stack traces and internal schema information were directly leaked to the UI via `err.message` in the catch block of `handleSubmit` inside `SubPages.tsx`.
**Learning:** Returning unvalidated error strings directly to `setError` states in React components exposes the application to reconnaissance attacks by unauthenticated users if the database connection fails or rejects an insertion.
**Prevention:** Always intercept database or network errors in UI catch blocks and substitute them with generic user-facing fallback strings. Retain the raw error using server-side logging or `console.error` for debuggability without risking client-side exposure.
