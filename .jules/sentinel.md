## 2024-05-04 - Fix Information Leakage in DB Error Handling
**Vulnerability:** Raw database error messages were exposed to the user in `SubPages.tsx`.
**Learning:** Always use generic error messages for the user interface while logging the actual error internally to prevent leaking backend database details.
**Prevention:** Ensure all `catch` blocks display safe, hardcoded error strings instead of passing through error message properties from the backend.
