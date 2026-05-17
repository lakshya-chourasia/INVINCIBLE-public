## 2026-05-17 - Prevent DB Information Leakage in UI
**Vulnerability:** Raw backend/database errors (`dbError.message`) from Supabase insertions were exposed directly to the user interface in `SubPages.tsx`.
**Learning:** Catching errors as `any` and blindly passing `err.message` to UI state bypasses security encapsulation, risking exposure of table structures, column names, or database constraints.
**Prevention:** Always type errors as `unknown` in catch blocks. Log the raw error to the console for debugging, but set generic, non-descriptive error messages in the UI state (e.g., "Synchronization failed.").
