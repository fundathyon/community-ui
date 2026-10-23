/**
 * Shared prop vocabulary (§18 of the design system).
 *
 * - `variant` — meaning: primary · secondary · ghost · destructive.
 * - `size`    — always `xs · sm · md · lg`, in every component.
 * - `tone`    — semantics of the content: info · success · warning · danger.
 *
 * Booleans are positive and present-tense (`disabled`, `loading`, `invalid`,
 * `selected`). Slots are named by position (`leading`, `trailing`, `footer`).
 * Handlers are `on{Event}`; controlled values are always `value`/`onChange`.
 *
 * Hard limit: past 8 props or 4 variants, split the component in two.
 */
export {};
