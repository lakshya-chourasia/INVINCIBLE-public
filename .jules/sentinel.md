## 2025-06-11 - Information Leakage in Supabase DB Error Handling
**Vulnerability:** The `SubPages.tsx` component exposes internal database error messages directly to the UI via `setError(err.message || ...)`. This can leak sensitive database schema information or internal query details to an attacker.
**Learning:** Generic error handling templates in React often naively pass backend error strings to the user. Frontend forms must sanitize or abstract database-level errors before displaying them.
**Prevention:** Never pass raw backend error objects or messages directly to state variables bound to UI components. Always use generic fallback messages (e.g., "An error occurred while saving.") and log the specific database error securely on the backend or in the console for debugging.
