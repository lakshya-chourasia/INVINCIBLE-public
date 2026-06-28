## 2024-05-18 - Database Error Information Leakage
**Vulnerability:** The `JoinCollective` component passed the raw `err.message` from a caught Supabase exception directly to the UI error state, which could expose internal database schemas, constraint names, or table structures to the end-user.
**Learning:** Even in frontend-only applications utilizing direct BaaS (Backend-as-a-Service) like Supabase, it is crucial to sanitize database error outputs before displaying them to users, as these services often return detailed postgres-level errors by default.
**Prevention:** Always catch and log the raw error for internal debugging (`console.error`), but provide a generic, safe fallback message (e.g., 'Synchronization failed. Please check your credentials.') to the user interface.
