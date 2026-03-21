## 2024-05-17 - Client Side Hardcoded API Key Leak
**Vulnerability:** A `GEMINI_API_KEY` was being hardcoded into the client side application code via `vite.config.ts`, `index.html` shim, and accessed directly in `ChatBot.tsx` using `window.process.env`.
**Learning:** Adding secrets to Vite `define` config injects them directly into the front-end bundle making them accessible to any client.
**Prevention:** Only use client-safe keys in the frontend. All private API keys must be kept on a secure backend proxy server that the frontend interacts with.
