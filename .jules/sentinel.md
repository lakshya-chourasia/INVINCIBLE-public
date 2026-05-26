## 2025-05-26 - Prevent Backend Error Leakage
**Vulnerability:** Raw database or backend error messages were being directly exposed to the frontend UI via `err.message` in `SubPages.tsx`.
**Learning:** Returning untrusted or overly detailed backend error messages to users is an Information Leakage vulnerability. It could expose database structures, configuration paths, or sensitive internal details.
**Prevention:** Always catch and log original errors securely on the backend (or in this case, the console), but provide a generic, safe error message to the UI to prevent exposing any internal details.
