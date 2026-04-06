## 2025-02-27 - [MEDIUM] Fix information leakage in error handling
**Vulnerability:** The error handler in `JoinCollective` exposed raw database error messages (`err.message`) directly to the UI, which could leak internal schema details, table names, or constraints from Supabase/PostgreSQL upon submission failure.
**Learning:** React catch blocks dealing with backend/database operations must always display generic, safe error messages to prevent potential reconnaissance by attackers through forced error states.
**Prevention:** Always use generic fallback strings for user-facing errors in data submission logic, and type the error parameter strictly as `unknown` (e.g., `catch (err: unknown)`) rather than `any` to prevent accidental property access.
