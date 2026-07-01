## 2024-05-24 - Prevent Database Error Information Leakage
**Vulnerability:** The application exposed raw Supabase database error messages (`err.message`) and the full error objects to the browser console during form submission failures on the `JoinCollective` page.
**Learning:** Returning database-specific error strings directly to the UI provides potential attackers with insights into the database schema, table structures, and internal logic constraints.
**Prevention:** Always implement a secure, generic error boundary for API or database operations on the client side. Log detailed errors server-side (if a backend exists) and present only non-descriptive, sanitized error messages to the user.
