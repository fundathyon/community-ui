"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";

export interface DocsSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name of the nav landmark. Overridable (Spanish copy). */
  label?: string;
}

/**
 * DocsSidebar — the docs navigation tree (§26). A scrollable `nav` of
 * `DocsSidebarSection`s, `DocsSidebarGroup`s and `DocsSidebarItem`s. It is
 * docs-specific (a link tree, not the app shell's icon rail) but reuses the
 * shell's active treatment: accent text + a 2px left bar (§12).
 */
export function DocsSidebar({ label = "Documentation", className, children, ...props }: DocsSidebarProps) {
  return (
    <nav aria-label={label} className={cn("flex flex-col gap-4 py-4 pr-2 text-body", className)} {...props}>
      {children}
    </nav>
  );
}

export interface DocsSidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Overline group label ("Getting started", "API reference"). */
  label?: ReactNode;
}

/** A titled, always-open group of sidebar items. For a foldable group use
 * `DocsSidebarGroup`. */
export function DocsSidebarSection({ label, className, children, ...props }: DocsSidebarSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {label !== undefined && (
        <div className="px-3 pb-1 text-overline uppercase text-text-muted">{label}</div>
      )}
      {children}
    </div>
  );
}

const depthPadding = ["pl-3", "pl-6", "pl-9"] as const;

export interface DocsSidebarItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** The link text. */
  label: ReactNode;
  href?: string;
  /** Current page: accent text + 2px left bar + `aria-current="page"` (§12). */
  active?: boolean;
  /** Nesting level (0–2) — controls indentation. */
  depth?: 0 | 1 | 2;
  /** Router substitution — spread the wired props onto the framework link:
   * `render={(props) => <RouterLink to="…" {...props} />}`. */
  render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => ReactElement;
}

/**
 * DocsSidebarItem — one destination in the docs tree (§26/§12). Active state is
 * accent text with a 2px left bar and `aria-current="page"`. Renders `<a>` by
 * default; pass `render` for a framework router link.
 */
export function DocsSidebarItem({
  label,
  href,
  active = false,
  depth = 0,
  render,
  className,
  ...props
}: DocsSidebarItemProps) {
  const itemProps: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode } = {
    href,
    "aria-current": active ? "page" : undefined,
    className: cn(
      "relative flex h-8 items-center rounded-md pr-2 text-body no-underline",
      depthPadding[depth],
      "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
      active
        ? [
            "font-medium text-accent",
            // 2px current bar pinned to the tree's left edge (§12).
            "before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-accent-solid before:content-['']",
          ]
        : "text-text-secondary hover:bg-surface-hover hover:text-text",
      "fdn-touch-target",
      className,
    ),
    children: <span className="min-w-0 truncate">{label}</span>,
    ...props,
  };
  return render ? render(itemProps) : <a {...itemProps} />;
}

export interface DocsSidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group trigger label. */
  label: ReactNode;
  /** Open on first render. */
  defaultOpen?: boolean;
}

/**
 * DocsSidebarGroup — a collapsible group of items with a chevron trigger (§26).
 * Built on Base UI Collapsible so the section folds away; put `DocsSidebarItem`s
 * inside. Use `DocsSidebarSection` when the group should always stay open.
 */
export function DocsSidebarGroup({ label, defaultOpen = true, className, children, ...props }: DocsSidebarGroupProps) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen} className={cn("flex flex-col gap-0.5", className)} {...props}>
      <Collapsible.Trigger
        className={cn(
          "group flex h-8 items-center gap-1 rounded-md px-3 text-overline uppercase text-text-muted",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:text-text",
          "fdn-touch-target",
        )}
      >
        <span className="min-w-0 flex-1 text-left">{label}</span>
        <Icon
          icon={ChevronDown}
          size={14}
          className="transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] group-data-[panel-open]:rotate-0 -rotate-90"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel
        className={cn(
          "flex flex-col gap-0.5 overflow-hidden",
          "h-[var(--collapsible-panel-height)] transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
          "data-[starting-style]:h-0 data-[ending-style]:h-0",
        )}
      >
        {children}
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
