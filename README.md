# @foundathyon/community-ui

**Foundathyon Community UI** — the official implementation of the Foundathyon
Design System (v2) for the Community suite: **Vault · Dokgistry · Accounts ·
Cronify · Mocky**.

> One design system. Many products. One implementation.

A product that consumes this library contributes only its **accent, config,
composition, content and domain behavior**. Buttons, tables, forms, dialogs,
charts, docs and emails come from here.

- React 18/19 · TypeScript strict · Tailwind CSS (v4 first-class, v3 preset)
- Headless a11y core: [Base UI](https://base-ui.com) · tables: TanStack Table · charts: Recharts (both fully encapsulated)
- Dark-first theming (`data-fdn-theme`), light as first class, product accent as a single `hue + L` pair
- SSR/App Router compatible: server components stay server; `"use client"` only where needed

## Install (Go-style, straight from the repo)

The package is installed from Git by tag — no npm registry involved. Works with
**pnpm, npm and bun** because the repo root *is* the package and `dist/` is
committed on release tags.

```jsonc
// package.json
"dependencies": {
  "@foundathyon/community-ui": "github:fundathyon/community-ui#semver:^0.2.0"
}
```

Pinning styles: `#v0.2.0` (exact tag) or `#semver:^0.2.0` (range over tags —
closest to `go get`). Private repo? Each environment needs read access to the
repo (SSH deploy key or a PAT via git config), same as `GOPRIVATE` + `.netrc`.

During local development inside this repo, the demo app consumes it via the
pnpm workspace instead.

## Wire up Tailwind

### Tailwind v4 (admin, accounts-admin, new apps)

```css
/* globals.css */
@import "tailwindcss";
@import "@foundathyon/community-ui/theme.css";
```

That's it. `theme.css` brings the `--fdn-*` tokens, maps them into Tailwind
(`bg-surface`, `text-text-muted`, `bg-accent-solid`, `text-success`,
`text-body`, `rounded-md`, `shadow-md`, `ease-standard`…) and registers an
`@source` so your build scans this package automatically.

### Tailwind v3 (accounts-docs, dokgistry web — until they migrate)

```js
// tailwind.config.js
module.exports = {
  presets: [require("@foundathyon/community-ui/tailwind-preset")],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@foundathyon/community-ui/dist/**/*.js",
  ],
};
```

```css
/* globals.css */
@import "@foundathyon/community-ui/tokens.css";
```

Note: the components stick to utilities that exist in both v3.4 and v4; v4 is
the primary target.

### No Tailwind at all

```ts
import "@foundathyon/community-ui/styles.css"; // prebuilt, self-contained
```

## Bootstrap a product

```tsx
// app/layout.tsx (Next.js App Router)
import { FoundathyonProvider, ThemeScript } from "@foundathyon/community-ui";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-fdn-product="cronify" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <FoundathyonProvider product="cronify">{children}</FoundathyonProvider>
      </body>
    </html>
  );
}
```

- `data-fdn-product` on `<html>` gives you the right accent **server-side** (no flash).
- `<ThemeScript />` applies the stored dark/light choice before first paint.
- `FoundathyonProvider` = ThemeProvider + density + product context. Pure React — it works outside Next.js too.

### Product accent

A product is a **hue**, not a hex (§02). Presets exist for the five products.
A new product declares two numbers:

```tsx
<FoundathyonProvider accent={{ hue: 210, l: 0.55 }}>
```

`accent-solid`, hover/active, `accent-text`, washes and the focus ring all
derive from that pair — calibrated so the solid keeps ≥5:1 contrast with white.
The accent is identity and action; **states always use the semantic colors**
(success/warning/danger/info) — never the accent.

### Theme

```tsx
const { theme, resolvedTheme, setTheme } = useTheme(); // "dark" | "light" | "system"
```

One mechanism only: `data-fdn-theme` on `<html>`, whole app included (login
too). Dark is design-first; light is first-class.

## Use it

```tsx
import {
  Button, DataTable, Badge, StatusBadge, Dialog, Input, FormField, Card,
} from "@foundathyon/community-ui";
import { LineChart } from "@foundathyon/community-ui/charts";
import { DocsLayout, Note } from "@foundathyon/community-ui/docs";
import { OtpEmail, renderEmail } from "@foundathyon/community-ui/email";
```

Entry points:

| Entry | Contents |
| --- | --- |
| `.` | tokens vocabulary, providers, hooks, all core components (layout, typography, actions, forms, feedback, overlays, navigation, data display, data table, developer UI, auth, security, resource patterns) |
| `./charts` | data visualization (token-driven, states included) |
| `./docs` | documentation subsystem (layout, content blocks, API reference components) |
| `./email` | transactional email primitives + templates (DOM-free, inline styles) |
| `./theme.css` / `./tokens.css` / `./styles.css` / `./tailwind-preset` | styling entries (see above) |

Everything ships as per-file ESM with types; `sideEffects` is limited to CSS,
so unused components tree-shake away. Charts/docs/email never load unless you
import their entry.

## Develop

```bash
pnpm install
pnpm typecheck        # tsc strict
pnpm test             # vitest + testing-library
pnpm build            # dist/: ESM + d.ts + css bundles
pnpm demo:dev         # showcase app (consumes the built package)
```

Release flow (Go-style consumption relies on tags carrying `dist/`):

```bash
pnpm release:check                 # typecheck + tests + build
git add -f dist && git commit -m "release: vX.Y.Z"
git tag vX.Y.Z && git push --tags
```

Semver per the design system (§18): removing a token or renaming a prop is a
**major**. A component enters this package when two products need it; until
then it lives in its product, marked as a candidate.

## Design system

The source document lives in `design/design-system-v2.md`; engineering rules in
`CONVENTIONS.md`. Non-negotiables baked into the code:

- Tokens only — components never hardcode a color, radius or spacing.
- Accent ≠ state. Semantic tetradas (`-text/-bg/-border/-solid`) per theme.
- Every interactive component ships default/hover/focus-visible/pressed/disabled,
  plus loading/empty/error where data loads (§C-03).
- Focus ring 2px + 2px offset everywhere (§C-02). Keyboard first.
- Compact density (28px controls) by default; comfortable (36px) for touch (§08).
- Reduced motion honored by reducing, not removing, transitions (§06).
