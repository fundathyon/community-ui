import { Children, isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { avatarSizeClasses, type AvatarSize } from "./avatar";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Show at most this many avatars; the rest collapse into a "+n" counter (§09). Default 3. */
  max?: number;
  /** Size of the overflow counter — match the avatars you pass in. Default 24. */
  size?: AvatarSize;
}

/**
 * AvatarGroup — overlapped avatars cut at `max` with a "+n" counter styled like
 * one more avatar (§09). Each face wears a `ring-surface` so the overlap reads as
 * separate people, not a blur. Pass Avatar children of a single size and set the
 * matching `size` so the counter lines up.
 */
export function AvatarGroup({ max = 3, size = 24, className, children, ...props }: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const visible = items.slice(0, max);
  const remainder = items.length - visible.length;

  const ring = "rounded-full ring-2 ring-surface";

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visible.map((child, index) => (
        <span key={index} className={cn(ring, index > 0 && "-ml-2")}>
          {child as ReactNode}
        </span>
      ))}
      {remainder > 0 ? (
        <span
          className={cn(
            "z-0 -ml-2 inline-flex items-center justify-center bg-surface-hover font-medium leading-none text-text-secondary",
            ring,
            avatarSizeClasses[size],
          )}
          aria-label={`${remainder} more`}
        >
          +{remainder}
        </span>
      ) : null}
    </div>
  );
}
