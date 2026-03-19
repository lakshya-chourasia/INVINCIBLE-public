## 2024-05-15 - Interactive Custom Elements Lack Keyboard Support
**Learning:** Using `div` tags for custom clickable elements (like logos or custom buttons) with only an `onClick` handler makes them entirely inaccessible to keyboard users and screen readers, effectively hiding critical navigation paths.
**Action:** Always ensure custom interactive elements have appropriate ARIA roles (`role="button"`), are focusable (`tabIndex={0}`), have descriptive accessible names (`aria-label`), and include corresponding keyboard event handlers (`onKeyDown` for Enter/Space) to mirror mouse functionality.
