import { ExternalLink } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

export type LinkVariant = "accent" | "neutral";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * `accent` — in prose, accent color, underline on hover.
   * `neutral` — inside data (tables, metadata), text color with a permanent
   * subtle underline so accent color doesn't create noise (§09).
   */
  variant?: LinkVariant;
  /** Opens in a new tab: `target="_blank" rel="noreferrer"` + 12px external icon. */
  external?: boolean;
  /**
   * Replace the rendered `<a>` with a framework router link. The element you
   * pass receives the computed `className`, the children and every anchor
   * attribute, so it must spread its props onto an anchor:
   * `<Link render={<NextLink href="/docs" />}>Docs</Link>`.
   */
  render?: ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

const variantClasses: Record<LinkVariant, string> = {
  // §09: the underline always appears on hover — color alone never indicates a link.
  accent: "text-accent decoration-accent hover:underline",
  neutral: "text-text underline decoration-border-strong hover:decoration-text-muted",
};

/**
 * Link — navigates to another route or document. If it executes an action it
 * is a Button, even if it looks like a link (§09). Renders an `<a>` by default;
 * pass `render` to substitute a framework router link.
 *
 * Two types only: `accent` in prose, underlined `neutral` inside data. Color
 * alone never indicates a link — the underline appears on hover (§09).
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "accent", external = false, render, className, children, ...props },
  ref,
) {
  const classes = cn(
    "rounded-sm underline-offset-2 transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
    variantClasses[variant],
    className,
  );
  const content: ReactNode = external ? (
    <>
      {children}
      <Icon icon={ExternalLink} size={12} className="ml-1 inline-block align-[-0.0625em]" />
    </>
  ) : (
    children
  );
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    ...props,
    ...(external ? { target: "_blank", rel: "noreferrer" } : null),
  };

  if (render) {
    return cloneElement(render, {
      ...anchorProps,
      // @ts-expect-error — ref is a valid prop for host/forwardRef elements.
      ref,
      className: cn(classes, render.props.className),
      children: content,
    });
  }

  return (
    <a ref={ref} className={classes} {...anchorProps}>
      {content}
    </a>
  );
});
