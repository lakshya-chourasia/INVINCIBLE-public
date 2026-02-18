## 2024-02-12 - Missing Backend Validation Layer
**Vulnerability:** Public form submissions are sent directly to Supabase without an intermediary API layer for validation.
**Learning:** Client-side apps using Backend-as-a-Service (BaaS) like Supabase often neglect input validation, relying solely on frontend constraints which can be bypassed.
**Prevention:** Implement Supabase Edge Functions or database triggers/constraints (RLS is not enough for data format) to validate data on the server side.
