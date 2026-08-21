# Community UI — Engineering conventions

The contract every component in this package follows. Read `design/design-system-v2.md`
for the design decisions; this file is about how those decisions become code.
The exemplar components are the source of truth for patterns:

- `src/components/actions/button.tsx` — CVA variants, density-driven default size, loading state, JSDoc style.
- `src/components/feedback/badge.tsx` — record-map styling (when CVA compounds would explode), tone typing.
- `src/components/forms/form-field.tsx` + `input.tsx` — Base UI Field integration, slots, invalid/disabled treatment.
- `src/components/overlays/dialog.tsx` — Base UI namespace wrapping, enter/exit motion, responsive sheet behavior.

## Architecture

- **Headless layer**: `@base-ui/react` v1.7 (per-component subpath imports:
  `import { Dialog } from "@base-ui/react/dialog"`). It provides: accordion,
  alert-dialog, autocomplete, avatar, checkbox, checkbox-group, collapsible,
  combobox, context-menu, dialog, drawer, field, fieldset, form, input, menu,
  menubar, meter, navigation-menu, number-field, otp-field, popover, progress,
  radio, radio-group, scroll-area, select, separator, slider, switch, tabs,
  toast, toggle, toggle-group, toolbar, tooltip. **Before wrapping one, read its
  `.d.mts` files in `node_modules/@base-ui/react/<component>/` — never guess an API.**
- **Tables**: `@tanstack/react-table` v8, encapsulated inside `data-table/` — its
  types never appear in other domains' public APIs.
- **Charts**: `recharts` v3, encapsulated inside `src/charts/` — consumers never
  import recharts types directly.
- **Dates**: `date-fns` + the formatters in `src/lib/format.ts`. Never hand-roll
  byte/duration/relative-date formatting — extend `lib/format.ts` if missing.
- **Icons**: `lucide-react` through `<Icon>` (stroke 1.5, sizes 12/14/16/20) or
  `[&_svg]:size-*` sizing on slots. Status icons are FIXED per state in
  `src/lib/status.ts` — never pick a different icon for the same state.
- **Email** (`src/email/`): plain React, inline styles, table layout. No DOM
  APIs, no hooks, no Tailwind classes, no "use client".

## Files & naming

- One component (or one tight family) per file, kebab-case: `status-badge.tsx`.
- Named exports only. No default exports anywhere.
- Every public component exports its props interface: `ButtonProps`, `DataTableProps`.
- Each domain has an `index.ts` barrel with EXPLICIT exports (no `export *` from
  component files). You own ONLY your domain's barrel; never edit `src/index.ts`,
  another domain's files, or shared `lib/` files (propose additions instead).
- Internal helpers not meant for consumers stay un-exported from the barrel.

## Props vocabulary (§18) — non-negotiable

- `variant` = meaning (`primary · secondary · ghost · destructive`).
- `size` = `Size` (`xs · sm · md · lg`) — import from `../../lib/types`. Controls
  default to the density size via `useDefaultSize(size)`.
- `tone` = `Tone`/`ToneOrNeutral` (`info · success · warning · danger`). Content
  semantics ONLY — never for brand.
- Booleans positive & present tense: `disabled`, `loading`, `invalid`, `selected`, `open`.
- Slots by position: `leading`, `trailing`, `footer`, `actions`.
- Handlers `on{Event}`; controlled pairs are `value`/`onChange` (or Base UI's
  `open`/`onOpenChange` for overlays — keep Base UI names when wrapping).
- Hard limit: >8 props or >4 variants → split the component (like Table vs DataTable).
- Extend native props: `extends ButtonHTMLAttributes<...>` / `ComponentProps<typeof BaseX.Y>`,
  `className` always mergeable via `cn()`, `forwardRef` on every leaf interactive component.

## Styling rules

- **Tokens only.** Colors exclusively through the mapped utilities:
  `bg-bg`, `bg-bg-subtle`, `bg-surface`, `bg-surface-raised`, `bg-surface-hover`,
  `border-border`, `border-border-strong`, `text-text`, `text-text-secondary`,
  `text-text-muted`, `text-text-disabled`, `bg-accent-solid`, `bg-accent-solid-hover`,
  `bg-accent-solid-active`, `text-accent`, `bg-accent-bg`, `border-accent-border`,
  `text-accent-on-solid`, `outline-focus`, and per tone `text-{tone}`,
  `bg-{tone}-bg`, `border-{tone}-border`, `bg-{tone}-solid`, `text-on-solid`.
  NEVER `bg-orange-500`, `text-green-500`, hex values, or raw `oklch()` in components.
- **Accent ≠ state.** The accent means brand/action; success/warning/danger/info
  mean state. A chart's "success series" is `success`, not accent.
- **No `dark:` variants.** Tokens flip themselves per theme. A component that
  needs `dark:` is styled wrong.
- Type scale utilities: `text-display/h1/h2/h3/h4/h5/body/body-sm/label/caption/overline/code`.
  Data numbers get `tabular-nums`. Never `font-bold` (700) under `text-h4` sizes — use 600.
- Spacing: 4px grid steps only (`gap-1.5` = 6px icon↔text, `gap-2` = 8px between
  controls, `gap-4` = 16px between form fields, `p-4` card padding, `gap-3` card grid,
  `gap-8` page sections). No arbitrary values like `p-[13px]`.
- Radii: `rounded-sm` (4, checkbox) · `rounded-md` (6, buttons/inputs/menu items) ·
  `rounded-lg` (8, code blocks/popovers) · `rounded-xl` (12, cards/tables/modals) ·
  `rounded-full` (badges/dots/avatars/switch). What wraps something goes one step up.
- Elevation: `shadow-xs/sm/md/lg/xl` + z via `fdn-z-sticky/dropdown/fullscreen/modal/toast/command`
  classes. Elevated surfaces use `bg-surface-raised` AND a border — shadow alone never.
- Motion: durations/easings via `duration-[var(--fdn-dur-fast|base|slow)]` and
  `ease-[var(--fdn-ease-standard|enter|exit)]`. Hover/pressed = color only (no
  translate/scale — `translateY` on :active is banned, §M-06). Enter = opacity +
  ≤8px travel; exit = opacity only. Spinners/skeletons use `fdn-spin` / `fdn-skeleton`
  classes (they degrade correctly under reduced motion).
- Focus: `base.css` applies the global ring. When a component suppresses outlines
  (inner input) restore with `FOCUS_RING` / `FOCUS_RING_INSET` from `lib/focus.ts`
  or `focus-within:outline...` like `input.tsx`. Never remove focus without substitute.
- Tailwind compatibility: stick to core utilities that exist in BOTH v3.4 and v4
  (the classes used by the exemplars are safe). Use bracket arbitrary values with
  `var()` (`duration-[var(--x)]`), not v4-only paren shorthand. `has-[...]`, `data-[...]`,
  `size-*` are fine (v3.4+).

## Component quality contract (§C-03)

A component is NOT done with only its happy state:

- Interactive: default, hover, focus-visible, pressed, disabled (45% opacity +
  `cursor-not-allowed`; never used for "no permission").
- Data-loading components: loading (skeleton if shape known, spinner if not,
  nothing under 300ms), empty, error, and — for filtered lists — "no results"
  (distinct from empty).
- Loading buttons keep their width (see button.tsx). Rows in terminal states
  drop to 0.6 opacity.
- Every overlay: focus trap, Esc closes, focus returns to trigger, backdrop
  inert, background scroll locked (Base UI does this — don't undo it).
- Icon-only controls: `aria-label` + Tooltip, enforced by the API (label required).
- Announce async: `aria-busy` on busy regions, `role="alert"` for errors,
  `role="status"` for polite updates.
- Touch: interactive controls get `fdn-touch-target` so coarse pointers reach 44px.

## Language

- Code, identifiers, JSDoc: English. Default UI strings: English, ALWAYS
  overridable via props (products ship Spanish copy). Never bake Spanish into
  defaults; never make copy non-overridable.

## RSC / client boundaries

- `"use client"` at the top of every file using hooks, context, Base UI, or
  event handlers. Purely presentational components (Badge, Icon, layout,
  typography, email, most docs blocks) must stay server-safe: no hooks, no
  "use client".
- Never import Next.js APIs. Links render `<a>` by default and accept a
  `render`/`as` substitution for framework routers.

## Testing (vitest + testing-library, `tests/<domain>/*.test.tsx`)

- Pattern in `tests/actions/button.test.tsx`. Query by role/label (a11y-first).
- Cover: renders + variants, keyboard interaction, controlled/uncontrolled,
  disabled/loading semantics, aria wiring (labels, describedby, alerts).
- `user-event` for interactions. No snapshot tests.

## JSDoc

Every exported component: 2–6 lines covering what it is, when to use it, when
NOT to (the §17 decision rules), citing DS sections like (§09). Props get one-line
docs where the name isn't enough.
