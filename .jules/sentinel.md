## 2025-03-08 - [Prevent DB Information Leakage]
**Vulnerability:** Information Leakage in JoinCollective form via raw DB error messages.
**Learning:** Exposing raw Supabase/database error messages directly to the UI (e.g. `err.message`) leaks database schema and constraints to users.
**Prevention:** Always catch errors as `unknown`, log the full error for debugging, and present a static generic error message to the user.
