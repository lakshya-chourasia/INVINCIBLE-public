## 2024-05-22 - [Local Verification Stability]
**Learning:** Local dev environments often lack production secrets (like Supabase keys). When verifying UI components that depend on these, missing keys can cause console errors or instability that flake out automated tests (Playwright).
**Action:** Always verify `.env` presence and provide mock/dummy values for external services when running local verification tests to ensure a clean testing environment.
