## 2024-03-01 - Prevent Internal Error Leakage
**Vulnerability:** The error handler in `SubPages.tsx` leaked internal Supabase database error messages (`err.message`) to the client when a node sync failed.
**Learning:** Returning `err.message` directly in UI components can expose underlying infrastructure details and stack traces.
**Prevention:** Catch errors as `unknown` and replace them with a static, generic error message (e.g. `Synchronization failed. Please check your credentials.`) instead of mapping the error properties.
