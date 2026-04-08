## 2025-04-08 - Prevent Info Leakage in Catch Blocks
**Vulnerability:** Raw exception strings (e.g. `err.message`) from database interactions (like Supabase errors) are bubbled up directly to the UI in `SubPages.tsx`. This can expose internal database schema or underlying error structures.
**Learning:** Error catch blocks should present generic error messages to the user to prevent information leakage.
**Prevention:** Always default to a generic user-facing message, explicitly logging the detailed error context separately if needed, without sending raw backend details to the state or error overlay.
