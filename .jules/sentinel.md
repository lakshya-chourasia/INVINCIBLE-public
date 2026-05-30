## 2024-05-15 - Information Leakage in Supabase Error Handling
**Vulnerability:** The application was catching database errors from Supabase in `SubPages.tsx` and passing `err.message` directly to the `setError` state, which is rendered in the UI.
**Learning:** Returning database error messages directly in the UI can leak sensitive internal database schemas, column names, or configurations to the user, particularly if `err.message` contains a raw SQL error from Supabase/PostgreSQL.
**Prevention:** Catch blocks handling backend/DB errors must explicitly override `err.message` with a generic, safe string for user consumption, while preserving the raw error only in `console.error` for debugging.
