## 2024-05-24 - Missing Input Validation
**Vulnerability:** The 'Join Collective' form submits user input directly to Supabase without any client-side validation logic beyond basic HTML attributes. While Supabase handles SQL injection, invalid data (e.g., malformed URLs, fake phone numbers) can still pollute the database.
**Learning:** Client-side validation is crucial for data integrity and UX, preventing bad data from reaching the backend and providing immediate feedback to users. Relying solely on backend or HTML validation is insufficient.
**Prevention:** Implement strict input validation using regex and length checks before any data submission. Use a centralized validation utility for consistency.
