# Sentinel Journal

## 2024-05-17 - Supabase Config Exposure in Logs
**Vulnerability:** The Supabase client initialization in `supabase.ts` logged the `supabaseUrl` to the console.
**Learning:** `console.log` statements containing potentially sensitive configuration URLs should be avoided in production environments to prevent information leakage.
**Prevention:** Remove `console.log` statements for configuration status or use a robust logging mechanism that redacts sensitive information.
