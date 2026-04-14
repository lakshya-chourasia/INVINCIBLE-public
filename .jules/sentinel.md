
## 2025-04-14 - Fix information leakage in error handling and logs
**Vulnerability:** The application was exposing raw exception details to the user interface on failed database operations and logging configuration variables (`supabaseUrl`) to the console on initialization.
**Learning:** These practices represent a security risk by potentially leaking internal implementation details, infrastructure layout, or credentials to malicious actors or through production logs.
**Prevention:** Always use a secure `catch (err: unknown)` block when catching exceptions, catch generic errors by default unless more granular detail is safely required, and remove `console.log` statements that leak secrets or config variables before deployment.
