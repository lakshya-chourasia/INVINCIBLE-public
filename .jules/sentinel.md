## 2024-05-24 - [Fix Catch Information Leakage in Supabase Sync]
**Vulnerability:** The application was exposing raw database error messages (`err.message`) in the UI when the Supabase insert query failed.
**Learning:** Returning `err.message` directly in React `catch (err: any)` blocks can unintentionally leak underlying database constraints, structure, or other sensitive internals directly to end-users. Additionally, typing caught errors as `any` circumvents TypeScript's safety features.
**Prevention:** Always use `catch (err: unknown)` and provide generic, safe user-facing error messages instead of propagating the underlying system errors. Log details server-side/console for debugging.
