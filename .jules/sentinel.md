## 2025-03-01 - Prevent Database Error Leakage in UI
**Vulnerability:** Backend/DB errors were being exposed directly to the user interface via `err.message` in the catch block of the Supabase database insert operation.
**Learning:** Returning unhandled database errors directly in the frontend can leak sensitive schema information or validation details to malicious actors.
**Prevention:** Always use generic, user-friendly error messages in the UI and strictly log the detailed technical errors to the console or server logs without exposing them to the user state.
