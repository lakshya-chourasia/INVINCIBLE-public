## 2024-05-24 - Accessibility for Icon-only Buttons in ChatBot
**Learning:** Found several icon-only buttons (open/close chat, send message, model toggle) that lacked ARIA labels, making them inaccessible to screen readers. We added `aria-label` to action buttons and `aria-pressed={state}` with a descriptive label for the model toggle.
**Action:** Always verify if an icon-only button needs an explicit `aria-label`. For toggles with visual state changes but no visible text changes, `aria-pressed` combined with an `aria-label` that includes the dynamic state text is crucial for accessibility.
