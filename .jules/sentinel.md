## 2024-05-05 - Remove Supabase URL leak in initialization
**Vulnerability:** Information leakage through `console.log('Supabase Client Initialized:', supabaseUrl);` in `supabase.ts`. Exposes internal configuration.
**Learning:** Even standard initialization success logs can leak sensitive configuration if the URL or configuration values are printed.
**Prevention:** Avoid logging configuration URLs or variables entirely in initialization flows. Use generic success messages.
