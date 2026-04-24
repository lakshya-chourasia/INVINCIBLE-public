## 2025-02-27 - Prevent Information Leakage in Frontend Clients
**Vulnerability:** Frontend logs and error handlers were exposing sensitive configuration (supabaseUrl) in the console and raw backend database errors (err.message) directly in the user interface.
**Learning:** Frontend code must act as a security boundary. Exposing backend details or raw configuration values, even if seemingly harmless, aids reconnaissance for attackers.
**Prevention:** Always log generic messages to users, retain raw errors only in internal console logs, and strictly avoid logging configuration values like endpoints or keys.
