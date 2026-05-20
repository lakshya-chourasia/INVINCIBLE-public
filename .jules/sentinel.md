## 2024-05-20 - Prevent DB Error Information Leakage
**Vulnerability:** Supabase database errors (which may contain schema details or SQL structures) were being passed directly to the frontend UI via `err.message`.
**Learning:** Developers often default to passing `err.message` to UI error states for debugging convenience, inadvertently exposing internal backend/DB details to end users.
**Prevention:** Always override backend/DB errors with generic, safe UI messages while logging the raw error internally (`console.error(err)`) to preserve debugging capabilities without compromising security.
