## 2024-06-29 - Prevent DB Error Leakage in UI
**Vulnerability:** The `JoinCollective` component in `SubPages.tsx` was directly passing raw database error messages (`err.message`) to the UI state (`setError`) when the Supabase `insert` operation failed.
**Learning:** Directly exposing backend or database error objects to the client interface can leak sensitive information about table schemas, constraints, or internal database architectures to potentially malicious users.
**Prevention:** Always catch raw backend/database errors and replace them with generic, safe, and user-friendly error strings before rendering them to the client. Log the raw error internally using `console.error` for debugging purposes without exposing it.
