## 2024-05-18 - Prevent Information Leakage in Error Handlers
**Vulnerability:** Raw backend/database error strings (like Supabase exceptions) were logged via `console.error` and conditionally rendered via `err.message` in the `JoinCollective` form on the frontend, potentially exposing internal database structure or schema details to the client DevTools.
**Learning:** Error boundaries and `catch` blocks in client code must display purely generic error messages when dealing with database operations or external API failures to prevent reconnaissance.
**Prevention:** Use `unknown` type in `catch` blocks instead of `any`, strictly remove `console.error(rawError)` from production paths, and hardcode user-friendly fallback strings instead of using error object properties.
