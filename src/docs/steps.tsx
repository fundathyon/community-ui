import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface StepProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  /** Step heading — a short imperative ("Create a project"). */
  title?: ReactNode;
  /** 1-based number, injected by `Steps`. Set it manually only outside `Steps`. */
  index?: number;
  /** Last step in the list — hides the connecting line. Injected by `Steps`. */
  last?: boolean;
}

/**
 * Step — one item of a numbered procedure (§26). A counter circle, an optional
 * title and the body. Numbering and the connecting line are managed by the
 * parent `Steps`; render `Step`s as its direct children. Server-component safe.
 */
export function Step({ title, index, last = false, className, children, ...props }: StepProps) {
  return (
    <li className={cn("relative flex gap-3 pb-6 last:pb-0", className)} {...props}>
      {/* Connecting line: from just below the circle to the next step. */}
      {!last && (
        <span aria-hidden className="absolute bottom-0 left-3 top-7 w-px -translate-x-1/2 bg-border" />
      )}
      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent-border bg-bg text-caption font-medium tabular-nums text-accent">
        {index}
      </span>
      <div className="min-w-0 flex-1 pt-0.5 text-sm leading-[1.7]">
        {title !== undefined && <div className="font-medium text-text">{title}</div>}
        <div className={cn("text-text-secondary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", title !== undefined && "mt-1")}>
          {children}
        </div>
      </div>
    </li>
  );
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {}

/**
 * Steps — an ordered procedure (§26): a numbered `ol` of `Step`s with counter
 * circles and a connecting line. Numbering is automatic, so author the steps in
 * order and never hard-code the numbers. For non-sequential alternatives use
 * `DocsTabs`; for optional detail use `Expandable`. Server-component safe.
 */
export function Steps({ className, children, ...props }: StepsProps) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol className={cn("my-6 list-none pl-0", className)} {...props}>
      {steps.map((child, i) =>
        // Inject the 1-based number and the last-item flag onto each Step.
        cloneElement(child as ReactElement<StepProps>, { index: i + 1, last: i === steps.length - 1 }),
      )}
    </ol>
  );
}
