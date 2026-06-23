## 2025-06-23 - Prevent Database Error Information Leakage to UI
**Vulnerability:** Information Leakage - The application directly passed `err.message` from `supabase` insert calls directly into the React UI state, potentially exposing backend database schema details, constraint names, or other internal information directly to users.
**Learning:** Even in frontend-only applications using direct database connections like Supabase, passing raw error messages to the client UI violates the "Fail Securely" principle and can aid attackers in mapping the database schema.
**Prevention:** Always catch and log original errors internally (`console.error(err)` for developer debugging), but override the UI-facing error with a generic, safe fallback message (e.g., 'Synchronization failed').
