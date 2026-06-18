## 2024-05-18 - Prevent Database Error Leakage in UI
**Vulnerability:** Raw database error messages (e.g., `err.message` from Supabase) were being passed directly to React state (`setError`) and rendered in the UI on the JoinCollective component.
**Learning:** This is a common anti-pattern in frontend applications that communicate directly with a database (like via Supabase). It can leak sensitive internal information, table names, or constraints to malicious users (Information Exposure).
**Prevention:** Always implement generic fallback error messages for the UI when handling backend/database exceptions. Preserve raw errors only in secure server logs or console logging (if appropriate for the environment), ensuring "fail securely" principles are upheld.
