## 2026-02-19 - Form Accessibility
**Learning:** Found critical form inputs lacking semantic labels (id/htmlFor), making them inaccessible.
**Action:** Always check form inputs for explicit label association, especially in custom UI components.

## 2026-02-19 - Automated Verification & CSS
**Learning:** Automated testing tools (like Playwright) may read `innerText` with CSS text-transforms applied (e.g., uppercase), causing strict string equality checks to fail against source code text.
**Action:** When verifying text content, use case-insensitive comparisons or `textContent` to check the raw DOM value if CSS styling interferes.
