## YYYY-MM-DD - [Title]
**Vulnerability:** [What you found]
**Learning:** [Why it existed]
**Prevention:** [How to avoid next time]

## 2024-11-20 - [Fix Information Exposure Through Error Messages]
**Vulnerability:** Raw database error strings (e.g. from Supabase `insert` operations) and raw Gemini API network exceptions were logged directly to the client console and potentially bubbled up to the UI.
**Learning:** Returning `err.message` in state meant that any unhandled internal backend schema issue or API failure could leak sensitive execution details or infrastructure structure to unauthorized client DevTools.
**Prevention:** Always use generic fallback strings for client-facing UI errors and remove explicit raw `console.error(err)` logging in production frontend code for backend interactions.
