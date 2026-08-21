/**
 * Global focus ring (§C-02): 2px ring + 2px offset in `--fdn-focus`,
 * applied via :focus-visible. Never suppressed without a substitute.
 *
 * `base.css` already applies this to every element; use this constant when a
 * component resets outlines (e.g. inputs with an inner border treatment) and
 * must restore the ring explicitly, or when the ring must render on a wrapper.
 */
export const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";
/** Focus ring for composite widgets where focus lands via keyboard on an item
 * (menus, listboxes) — inset variant that survives overflow clipping. */
export const FOCUS_RING_INSET = "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus";
