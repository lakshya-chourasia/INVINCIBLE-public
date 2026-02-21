# Sentinel Journal - Security Learnings

## 2024-02-21 - Input Validation Strategy
**Vulnerability:** The `JoinCollective` form lacked input validation, relying solely on basic HTML5 constraints which are easily bypassed, posing a risk of data corruption and injection attacks.
**Learning:** The application architecture did not enforce strict data typing or sanitization at the input layer.
**Prevention:** All user inputs must now pass through centralized regex validation logic defined in `utils/validation.ts` before submission to Supabase.
