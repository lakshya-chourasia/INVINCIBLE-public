## 2024-05-18 - Prevented DB Backend Errors Leak in Frontend State
**Vulnerability:** The 'JoinCollective' component leaked Supabase backend dbError payload (via `err.message`) directly into the frontend state (`error`), displaying it unprotected to users.
**Learning:** Broad error catch blocks that propagate untrusted raw backend errors to UI state risk exposing database schema details, node connectivity hints, or auth keys on failure scenarios.
**Prevention:** Always use `catch (err: unknown)`, sanitize error output, and replace backend messages with generic safe UI responses prior to displaying them.
