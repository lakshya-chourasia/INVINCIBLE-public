# Sentinel Security Journal

## 2025-02-19 - Missing Input Validation on Public Form
**Vulnerability:** The 'Join Collective' form submitted user data directly to Supabase without frontend validation, relying solely on potential (but initially missing) database constraints.
**Learning:** Frontend validation is critical for user feedback and reducing invalid database load, but database constraints are the final line of defense. The project lacked both initially.
**Prevention:**
1. Implement a shared validation utility (e.g., `validation.ts`) for frontend use.
2. Enforce strict `CHECK` constraints in the database schema (`supabase_setup.sql`) mirroring the frontend rules.
3. Use a comprehensive testing strategy (unit tests for validation logic, integration tests for form behavior).
