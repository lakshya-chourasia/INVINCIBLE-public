## 2024-05-24 - Layout Thrashing Avoidance
**Learning:** Using document.elementFromPoint immediately after writing styles via CSS variables triggers a synchronous layout recalculation, tanking performance inside requestAnimationFrame.
**Action:** Always read targets directly from MouseEvent.target rather than performing geometric lookups after DOM mutation.
