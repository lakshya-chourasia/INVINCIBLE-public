## 2024-06-15 - Explicit Form Label Binding in Custom Typography Patterns
**Learning:** In this design system, custom typography labels (e.g., using tracking-widest, uppercase styling) often rely on visual `<label>` elements but omit explicit `htmlFor` attributes matching the corresponding input's `id`. This breaks native click-to-focus behavior and impairs screen reader association, particularly in forms.
**Action:** When implementing new forms or reviewing existing ones, actively ensure that any visual label element explicitly binds to its input using `htmlFor` and a matching `id`.
