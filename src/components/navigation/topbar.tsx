"use client";

import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  /** Product/brand zone on the left. */
  leading?: ReactNode;
  /** Center zone — typically the search trigger ("Buscar ⌘K"). */
  center?: ReactNode;
  /** Actions and user on the right (UserMenu, AppSwitcher). */
  trailing?: ReactNode;
  /**
   * Shadow under the bar. Pass a boolean when the app owns a custom scroll
   * container; when omitted the Topbar watches window scroll itself.
   */
  elevated?: boolean;
  /** Stick to the top of the viewport (default). */
  sticky?: boolean;
}

/**
 * Topbar — the 48px shell header, identical across the suite (§12). Sticky,
 * with a hairline border; it gains a small shadow once the page scrolls so
 * content visibly slides beneath it.
 */
export function Topbar({
  leading,
  center,
  trailing,
  elevated,
  sticky = true,
  className,
  children,
  ...props
}: TopbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const watchScroll = elevated === undefined;

  useEffect(() => {
    if (!watchScroll) return;
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [watchScroll]);

  const isElevated = elevated ?? scrolled;

  return (
    <header
      className={cn(
        "flex h-header shrink-0 items-center gap-3 border-b border-border bg-bg px-4",
        sticky && "sticky top-0 fdn-z-sticky",
        "transition-shadow duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
        isElevated && "shadow-sm",
        className,
      )}
      {...props}
    >
      {leading && <div className="flex shrink-0 items-center gap-2">{leading}</div>}
      <div className="flex min-w-0 flex-1 items-center justify-center">{center}</div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
      {children}
    </header>
  );
}
