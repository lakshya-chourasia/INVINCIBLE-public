## 2024-07-04 - Missing explicit label associations in custom forms
**Learning:** Forms utilizing custom typography and spacing for labels often lack proper 'htmlFor' bindings to input 'id's, which breaks click-to-focus and screen reader accessibility.
**Action:** Always verify that every visual label element in a form is explicitly bound to its target input via 'htmlFor' and 'id'.
