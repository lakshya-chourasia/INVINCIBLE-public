## 2024-03-20 - Prevent Database Error Leakage in UI
**Vulnerability:** The Supabase database insert error (`err.message`) was directly rendered to the user interface in the JoinCollective form upon failure.
**Learning:** Returning backend/database errors directly to the client can leak internal schema structures, constraint names, and architectural details to potential attackers.
**Prevention:** Always log detailed errors server-side (or securely in the console if acceptable) but return only generic, safe error messages (e.g., "Synchronization failed") to the end user.
