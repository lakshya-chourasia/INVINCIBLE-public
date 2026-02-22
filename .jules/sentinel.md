# Sentinel's Journal

## 2026-02-22 - Input Validation Enhancement
**Vulnerability:** The member join form allowed direct submission of unvalidated data to the backend, including potential phishing URLs in LinkedIn/GitHub fields and malformed contact info.
**Learning:** Client-side validation acts as the first line of defense against bad data and simple attacks (like submitting malicious URLs). Relying solely on database constraints or HTML5 attributes is insufficient for security-critical fields like external profile links.
**Prevention:** Implemented strict validation for names (Unicode support), phone numbers (format & length), and URLs (hostname whitelisting) before any API interaction. This pattern should be applied to all future forms.
