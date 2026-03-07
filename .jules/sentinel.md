## 2025-03-07 - Prevent Information Leakage in Catch Blocks
**Vulnerability:** Raw backend and database error objects (e.g., Supabase, Gemini API) were being exposed to the client interface and browser DevTools console via `catch (err: any) { console.error(err); setError(err.message) }`. This inadvertently exposes database schema structure or external API constraints to malicious users.
**Learning:** Frontend code must explicitly sanitize caught exceptions. Do not blindly map backend `err.message` properties to client UI state variables or console logs.
**Prevention:** Use the `unknown` type in `catch` blocks. Replace backend error logging with generic, safe client-facing messages like "Synchronization failed. Please try again later."
