## 2024-05-24 - Error Message Information Leakage in Form Submission
**Vulnerability:** The `JoinCollective` component exposed raw Supabase client errors (`err.message`) directly to the user interface, risking the leakage of database schema details or internal backend architecture.
**Learning:** Frontend catch blocks handling backend/database interactions might inadvertently expose internal exceptions if error handling does not intentionally sanitize outputs.
**Prevention:** Always use `catch (err: unknown)` instead of `any`, and display generic, user-friendly messages (e.g., "Synchronization failed") rather than bubbling up raw exceptions to the UI.
