## 2024-03-12 - Explicit Form Input Bindings for Custom Typography Labels
**Learning:** In this design system, standard `<label>` tags are heavily stylized via typography utilities but often lack explicit `htmlFor` and `id` bindings to their corresponding inputs. Relying purely on visual proximity breaks basic UX functionality like click-to-focus and screen reader contextual association.
**Action:** Always ensure custom typography labels are explicitly bound to their input elements via `htmlFor` and `id` attributes.
