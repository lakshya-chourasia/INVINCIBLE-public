## 2025-02-28 - [Secure Error Handling for Database Responses]
**Vulnerability:** The `JoinCollective` form's `handleSubmit` exposed the raw database error message (`err.message`) from Supabase directly in the UI and also logged the raw error object to the console, risking the leakage of database schemas, internal data structures, or connection details.
**Learning:** The frontend code shouldn't blindly bubble up backend/database error strings to users since these can contain sensitive metadata.
**Prevention:** In TypeScript frontend code, `catch (err: unknown)` should be used to enforce generic error checking, and generic error messages ("Synchronization failed") should be surfaced to users instead of the specific database exception strings.
