## YYYY-MM-DD - Fix Supabase Catch Information Leakage
**Vulnerability:** Information leakage through `err.message` in `catch` block for a database insert operation, displaying potentially sensitive database errors to the user.
**Learning:** `catch` blocks involving database operations or third-party APIs should present generic, user-friendly error messages instead of leaking the underlying exception string or stack trace to the frontend UI.
**Prevention:** Use a generic error message (e.g. 'Synchronization failed. Please check your credentials.') and do not log or set `err.message` in the frontend UI state where it might be seen by users. Always use `catch (err: unknown)` instead of `any` for caught errors to reinforce type safety.
