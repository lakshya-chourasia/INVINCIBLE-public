## 2024-05-24 - Prevent Database Error Leakage to UI
**Vulnerability:** Database errors were being directly exposed to the UI via `err.message` in a catch block, creating an information leakage vulnerability.
**Learning:** Returning unhandled database errors to the frontend can expose database schemas, internal configurations, or validation specifics.
**Prevention:** Always catch specific database/backend errors and replace them with generic, safe user-facing error messages while ensuring the raw details are logged server-side or to the console for secure debugging.
