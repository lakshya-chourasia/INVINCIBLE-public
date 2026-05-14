## 2026-05-14 - Fix Information Leakage in Form Submission Error
**Vulnerability:** Error handling in `SubPages.tsx` exposed raw database/backend error messages directly to the UI.
**Learning:** Backend errors in catch blocks must not have their raw messages exposed to the UI as it leaks internal system state.
**Prevention:** Always override backend database errors with generic, secure error messages in the UI and use `err: unknown` in catch blocks.
