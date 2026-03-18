## 2024-05-24 - API Key Exposure via Vite Define

**Vulnerability:** The Gemini API key was explicitly hardcoded into the client bundle through Vite's `define` configuration (`'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)`), allowing any client to inspect the source code and use the API token.
**Learning:** Build-time replacement tools like `define` inject raw string values directly into the JS bundle payload, exposing secrets entirely to the public. Secrets needed for external APIs should never be injected this way for client consumption.
**Prevention:** Proxy API calls that require secrets through a secure backend (like Vercel serverless functions in the `/api` directory) and keep environment variables securely on the server-side, verifying that the client codebase only communicates through controlled endpoints.
