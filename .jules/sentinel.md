## 2024-05-18 - [Information Leakage in Error Handlers]
**Vulnerability:** Catch blocks are returning/logging the actual `error.message` or the exact `error` to the client/user.
**Learning:** Returning `error.message` could leak details of database queries or sensitive underlying infrastructure states. E.g., `setError(err.message)` might leak Supabase specifics.
**Prevention:** Catch blocks should display generic error messages, avoiding `err.message` if it originates from external APIs (like Supabase or GenAI) to prevent leaking structural schema or error state internals.
