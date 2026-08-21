import { Info, Lightbulb, OctagonAlert, Sparkles, StickyNote, TriangleAlert, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";

/**
 * The admonition kinds (§26). `note`, `warning`, and `danger` map to their
 * matching semantic tone. `tip` maps to the ACCENT — §26 "Consejo … Único uso
 * del acento en docs": Tip is the spec's one sanctioned use of the brand
 * color in the docs callout system (this was previously wired to `important`
 * by mistake; fixed below). `aside` (§26 "Ejemplo") is intentionally
 * neutral/colorless — "no es un aviso", not a warning-family callout at all.
 * `important` is a pre-existing kind beyond the spec's 5 tones, kept for
 * emphatic brand callouts; it also renders in the accent, a known second use
 * left as-is (out of scope for this pass — see admonition.test.tsx).
 */
export type AdmonitionKind = "note" | "tip" | "warning" | "danger" | "important" | "aside";

interface KindSpec {
  icon: LucideIcon;
  /** Default, overridable title (English — products ship their own copy). */
  title: string;
  /** Left bar color. §26: a 2px side bar, not a full border — this is what
   * distinguishes the docs callout from the product Alert. */
  bar: string;
  /** Wash background + icon/title color. */
  wash: string;
  text: string;
}

const KIND: Record<AdmonitionKind, KindSpec> = {
  note: { icon: Info, title: "Note", bar: "border-info-border", wash: "bg-info-bg", text: "text-info" },
  // §26 "Consejo … Único uso del acento en docs" — Tip is the ONE accent-toned kind.
  tip: { icon: Lightbulb, title: "Tip", bar: "border-accent-border", wash: "bg-accent-bg", text: "text-accent" },
  warning: {
    icon: TriangleAlert,
    title: "Warning",
    bar: "border-warning-border",
    wash: "bg-warning-bg",
    text: "text-warning",
  },
  danger: {
    icon: OctagonAlert,
    title: "Danger",
    bar: "border-danger-border",
    wash: "bg-danger-bg",
    text: "text-danger",
  },
  important: {
    icon: Sparkles,
    title: "Important",
    bar: "border-accent-border",
    wash: "bg-accent-bg",
    text: "text-accent",
  },
  // §26 "Ejemplo" — neutral/colorless on purpose: explicitly not a warning-family callout.
  aside: {
    icon: StickyNote,
    title: "Aside",
    bar: "border-border",
    wash: "bg-bg-subtle",
    text: "text-text-secondary",
  },
};

export interface AdmonitionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Which callout kind. Prefer the named presets (Note/Tip/Warning/Danger/Aside/Important). */
  kind: AdmonitionKind;
  /** Heading of the callout. Defaults to the kind's name; always overridable. */
  title?: ReactNode;
  /** Override the kind's fixed icon — rarely justified (§07). */
  icon?: LucideIcon;
}

/**
 * Admonition — the one callout component behind the docs presets (§26): the
 * spec's five tones (Note/Tip/Warning/Danger/Aside) plus the pre-existing
 * extra `Important`. A 2px side bar (not a full border, which is what
 * separates it from the product Alert), a tonal wash, a fixed icon per kind
 * and an optional title.
 *
 * Docs are static content, so — unlike Alert — an admonition carries NO
 * `role="alert"`/`status`: the icon and title convey the meaning. Max two per
 * page (§26); a third means the prose itself needs rewriting. Server-safe.
 */
export function Admonition({ kind, title, icon, className, children, ...props }: AdmonitionProps) {
  const spec = KIND[kind];
  return (
    <div
      data-kind={kind}
      className={cn(
        // 2px left bar + wash, rounded like the app's other surfaces (§26).
        "my-4 rounded-lg border-l-2 p-3 text-sm leading-[1.7]",
        spec.bar,
        spec.wash,
        className,
      )}
      {...props}
    >
      <div className={cn("mb-1 flex items-center gap-1.5 font-medium", spec.text)}>
        <Icon icon={icon ?? spec.icon} size={16} />
        <span>{title ?? spec.title}</span>
      </div>
      <div className="text-text-secondary [&_a]:text-accent [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/** Note (§26) — context worth knowing. Info tone. */
export function Note({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="note" {...props} />;
}

/** Tip (§26) — an optional recommendation. The one sanctioned accent use in docs. */
export function Tip({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="tip" {...props} />;
}

/** Warning (§26) — may have consequences. Warning tone. */
export function Warning({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="warning" {...props} />;
}

/** Danger (§26) — permanently destroys data. Danger tone. */
export function Danger({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="danger" {...props} />;
}

/** Important (§26) — brand emphasis, a pre-existing kind beyond the spec's 5 tones. */
export function Important({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="important" {...props} />;
}

/**
 * Aside (§26 "Ejemplo") — the spec's 5th, neutral tone: colorless, "no es un
 * aviso" (not a warning-family callout at all).
 *
 * Named `Aside`, not `Example` — `Example` already names the unrelated
 * tabs+code walkthrough component in this domain (see example.tsx). Reusing
 * that name here would conflate two different things: this is a plain
 * neutral callout, that is a structural preview/code block.
 */
export function Aside({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="aside" {...props} />;
}
