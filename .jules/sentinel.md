## 2026-03-02 - [Secure Error Handling]
**Vulnerability:** Supabase database error messages (`err.message`) were directly passed to the UI state (`setError`), potentially exposing internal database schema, row-level security policies, or constraints to end users.
**Learning:** Direct pass-through of backend/database exception messages to the frontend UI is an information leakage risk.
**Prevention:** Always use generic, user-friendly error messages in frontend catch blocks when handling backend operations, and cast catch errors to `unknown` rather than `any`.
