import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Fully clickable card: surface hover + focus ring when its inner link is
   * focused. The card's TITLE is the real link — the card itself never gets
   * an onClick (§15).
   *
   * The ring is delegated to this wrapper via `focus-within`, exactly like
   * Input/Combobox/Slider — which means the real link YOU render as the
   * title must carry `className="outline-none"` (or `cn(..., "outline-none")`)
   * itself, or it will paint its own native focus ring on top of the card's
   * and double it (§C-02).
   */
  interactive?: boolean;
}

/**
 * Card — bordered surface for grouped content (§15). Cards do NOT float: in
 * this suite elevation means "floats over the page", so a card has a border
 * and NO shadow. Header and footer are optional; the body is not.
 *
 * Server-component safe.
 */
export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-border bg-surface",
        interactive &&
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        className,
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Row actions on the right (ghost buttons, a menu). */
  actions?: ReactNode;
}

/** Card header — title (text-h5, §03) plus optional right-aligned actions. */
export function CardHeader({ actions, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-2 px-4 pt-4", className)} {...props}>
      <div className="min-w-0 text-h5 text-text">{children}</div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Card body — 16px padding (§04). The only mandatory region of a card. */
export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 p-4", className)} {...props} />;
}

/** Card footer — separated by a border, actions aligned right. */
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-end gap-2 border-t border-border px-4 py-3", className)}
      {...props}
    />
  );
}
