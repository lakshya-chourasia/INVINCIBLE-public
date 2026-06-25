## 2023-10-27 - [Prevent Database Error Leakage]
**Vulnerability:** Raw database errors were being exposed to the UI via `err.message` in `SubPages.tsx`.
**Learning:** This exposes internal database schema or validation errors to end users, potentially aiding attackers in understanding the backend structure.
**Prevention:** Replace raw error messages with generic failure messages in the UI while retaining console logging for debugging.
