## 2025-04-03 - Fix information leakage in Supabase exception handling
**Vulnerability:** Supabase exception error objects were caught as `any` and their raw messages (`err.message`) were directly piped to a user-facing error state.
**Learning:** This exposes potential schema structure or server internals if an unexpected Supabase constraint or database-level crash occurs.
**Prevention:** Catch errors as `unknown` and supply a hardcoded, safe fallback string to the user-facing state while strictly logging the raw object securely on the client console (or to a proper telemetry system).
