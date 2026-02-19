## 2025-02-19 - Insecure API Key Injection Pattern
**Vulnerability:** The `vite.config.ts` injects `process.env.GEMINI_API_KEY` into the client-side bundle via the `define` plugin.
**Learning:** This exposes the API key to anyone inspecting the built JavaScript, even if the code that uses it (`ChatBot.tsx`) is unused. Build tools can bake secrets into public assets.
**Prevention:** Never inject secrets via `define` or `VITE_*` env vars for client-side use unless they are public keys. Use a proxy/backend for sensitive operations.
