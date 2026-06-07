## 2024-05-18 - [Prevent Raw Database Error Leakage]
**Vulnerability:** Information Leakage. Raw Supabase database error messages (`err.message`) were being caught and passed directly into the React component UI state (`setError`), exposing backend/schema details to the client when a database insertion failed.
**Learning:** In a serverless frontend architecture communicating directly with a DB (like Supabase), generic frontend catch blocks often inadvertently expose raw DB errors unless explicitly filtered.
**Prevention:** Always overwrite caught database or API error messages with generic, user-friendly strings in the UI state (e.g., "Synchronization failed"), while securely logging the raw `err` object to the console or an internal logging service for debugging.
