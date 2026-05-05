1. **Analyze:** Verify the `GlobalInteraction.tsx` file to confirm the `document.elementFromPoint` bottleneck and `requestAnimationFrame` setup.
2. **Implement:** Update `GlobalInteraction.tsx` to remove `document.elementFromPoint` and instead cache `e.target` from the `mousemove` event into an outer scope variable (`currentTarget`). This eliminates layout thrashing and avoids stale closures. Include the mandatory inline `// ⚡ Bolt Performance Optimization: ...` comment explaining the bottleneck and impact.
3. **Document:** Add an entry to `.jules/bolt.md` documenting the critical learning regarding layout thrashing and stale closures in throttled high-frequency event handlers.
4. **Verify:** Verify the `.jules/bolt.md` file format using `cat`. Run `pnpm run build` to confirm the application builds correctly. Run `frontend_verification_instructions` to test the frontend visual functionality.
5. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. **Submit:** Submit a PR with the title "⚡ Bolt: [performance improvement]" and a detailed description including 💡 What, 🎯 Why, 📊 Impact, and 🔬 Measurement sections.
