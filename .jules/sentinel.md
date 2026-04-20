## 2024-04-20 - [Fix Information Leakage in DB Errors]
**Vulnerability:** Supabase internal database errors could potentially leak through the `err.message` in a generic `catch (err: any)` block if not correctly typed.
**Learning:** Supabase dbError structures (or raw backend rejections) might not strictly be standard JavaScript `Error` objects on the client, so treating caught rejections as `unknown` and applying `err instanceof Error` safely isolates internal shapes from the standard fallback logic, effectively preventing leakage.
**Prevention:** Always use `catch (err: unknown)` instead of `any`, and explicitly validate the error type (e.g. `err instanceof Error`) before accessing properties like `.message` to show in user-visible UIs.
