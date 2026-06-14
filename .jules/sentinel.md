## 2025-02-28 - Prevent database error details leakage to UI
**Vulnerability:** Supabase database error messages (`err.message`) were being directly passed to the `setError` state in the `JoinCollective` component (`SubPages.tsx`), potentially exposing internal database structures, query syntax, or constraint details to the end-user.
**Learning:** Even when using a managed backend like Supabase, relying on raw error messages for UI feedback is risky because the underlying platform may leak sensitive diagnostic information that attackers can use for reconnaissance.
**Prevention:** Always sanitize errors destined for the UI by hardcoding generic, user-friendly fallback messages, while ensuring the raw error is still logged securely (e.g., via `console.error`) for debugging purposes.
