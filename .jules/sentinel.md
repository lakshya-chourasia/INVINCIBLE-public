## 2024-11-20 - Prevent Database Error Leakage to Frontend UI
**Vulnerability:** Catch blocks handling backend/database operations (e.g. Supabase interactions) were exposing raw exception strings (`err.message`) directly to the user UI, which can leak database schema details, constraints, or internal logic.
**Learning:** The frontend was utilizing a naive error handling approach, relying on backend error messages instead of generic UI messages. Catch blocks were using `any` type, which bypassed TypeScript checks.
**Prevention:** Always use generic error messages for the user facing UI rather than bubbling up raw exception strings or stack traces. Use the `unknown` type instead of `any` in `catch` blocks.
