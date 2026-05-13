## 2024-05-20 - [Database Error Leakage]
**Vulnerability:** The application was exposing raw database error messages directly to the UI through the `dbError.message` property, potentially leaking internal database schema details or providing attackers with clues about backend structures.
**Learning:** Even when errors occur client-side via direct DB connections (like Supabase client), passing raw error objects or messages to state hooks (`setError(err.message)`) bypasses the needed abstraction layer and exposes raw infrastructure errors to end users.
**Prevention:** Always override backend or database-originated error messages with generic, user-friendly fallback messages before updating UI state. Type `catch` errors as `unknown` and safely access properties only for internal logging.
