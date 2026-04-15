## 2024-04-15 - Information Leakage in Database Error Handling
**Vulnerability:** The application was catching raw database errors (`catch (err: any)`) and passing the raw error message directly into the UI via the `setError(err.message || ...)` hook in the `JoinCollective` component.
**Learning:** Raw backend exceptions often contain sensitive information about database schemas, server structures, or execution contexts. Allowing them to bubble up to the client UI violates the principle of failing securely.
**Prevention:** Always cast caught errors in frontend components to `unknown` and explicitly extract safe, generic error strings for display to the user, ensuring system internals are never exposed.
