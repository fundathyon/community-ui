import { Info, Lightbulb, OctagonAlert, Sparkles, TriangleAlert, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";

/**
 * The five admonition kinds (§26). Four map to the semantic tones; `important`
 * maps to the ACCENT — the only sanctioned use of the brand color in docs
 * (§26 "Consejo … Único uso del acento en docs" is extended to the emphatic
 * "Important" callout): it is brand emphasis, never a state, so it never uses a
 * tone token.
 */
export type AdmonitionKind = "note" | "tip" | "warning" | "danger" | "important";

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
  tip: { icon: Lightbulb, title: "Tip", bar: "border-success-border", wash: "bg-success-bg", text: "text-success" },
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
};

export interface AdmonitionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Which of the five callouts. Prefer the named presets (Note/Tip/…). */
  kind: AdmonitionKind;
  /** Heading of the callout. Defaults to the kind's name; always overridable. */
  title?: ReactNode;
  /** Override the kind's fixed icon — rarely justified (§07). */
  icon?: LucideIcon;
}

/**
 * Admonition — the one callout component behind the five docs presets (§26).
 * A 2px side bar (not a full border, which is what separates it from the
 * product Alert), a tonal wash, a fixed icon per kind and an optional title.
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

/** Tip (§26) — an optional recommendation. Success tone. */
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

/** Important (§26) — brand emphasis, the sanctioned docs use of the accent. */
export function Important({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & { kind?: never }) {
  return <Admonition kind="important" {...props} />;
}
