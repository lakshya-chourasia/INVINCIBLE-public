## 2024-05-20 - Vite Env Leakage
**Vulnerability:** `GEMINI_API_KEY` exposed in client bundle via `define` in `vite.config.ts`.
**Learning:** Hardcoding or leaking API keys through the vite `define` configuration can expose them to client side, especially when there's no backend API proxy.
**Prevention:** Avoid defining sensitive variables in the frontend bundle config (`vite.config.ts`); instead, proxy requests through a secure server.
