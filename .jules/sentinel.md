## 2024-06-13 - Prevent API Key Leakage to UI
**Vulnerability:** The application logs missing API keys directly to the user-facing chat UI ("Error: API Key not found in environment. Please check your configuration.").
**Learning:** Exposing detailed configuration/environment errors directly to the end user provides unnecessary details about backend setup and environment variables. Even though the key itself isn't leaked here, the existence and dependency on `API_KEY` in `process.env` is revealed.
**Prevention:** Fail securely by showing a generic user-friendly error message, while logging the actual issue to the console or server logs for debugging.
