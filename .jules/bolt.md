## 2024-05-14 - Replace document.elementFromPoint with event.target
**Learning:** Using `document.elementFromPoint` inside a highly frequent event like `mousemove` (even when throttled by `requestAnimationFrame`) can cause layout thrashing and unnecessary performance degradation.
**Action:** Always prefer capturing `event.target` at the time of the event handler rather than querying the document layout dynamically.
