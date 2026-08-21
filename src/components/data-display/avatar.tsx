"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/** Avatar scale (§04): 20 · 24 (default) · 32 · 40. */
export type AvatarSize = 20 | 24 | 32 | 40;

/** Presence — rendered ONLY where presence carries meaning (§09). */
export type AvatarPresence = "online" | "offline";

/** Size → box + initials type scale. Exported for AvatarGroup's counter, not the barrel. */
export const avatarSizeClasses: Record<AvatarSize, string> = {
  20: "size-5 text-caption",
  24: "size-6 text-caption",
  32: "size-8 text-label",
  40: "size-10 text-body",
};

/**
 * The five deterministic washes (§09). Four semantic tones plus neutral — the
 * background is NEVER random: it is derived from a stable hash of the identifier,
 * so the same person always gets the same color.
 */
const WASHES = [
  "bg-info-bg text-info",
  "bg-success-bg text-success",
  "bg-warning-bg text-warning",
  "bg-danger-bg text-danger",
  "bg-surface-hover text-text-secondary",
] as const;

/** Stable string hash (deterministic across renders and reloads). */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Pick a wash from the identifier — same identifier → same wash, always. */
export function washFor(identifier: string): string {
  if (!identifier) return WASHES[WASHES.length - 1]!;
  return WASHES[hashString(identifier) % WASHES.length]!;
}

/** Initials from a display name: two words → first+last; email/single → sensible fallback. */
export function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length >= 2) {
    const first = parts[0]!;
    const last = parts[parts.length - 1]!;
    return (first[0]! + last[0]!).toUpperCase();
  }
  const token = parts[0]!;
  if (token.includes("@")) return token[0]!.toUpperCase();
  return token.slice(0, 2).toUpperCase();
}

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 20 · 24 (default) · 32 · 40 (§04). */
  size?: AvatarSize;
  /** Display name — drives the initials fallback and the default hash seed. */
  name?: string;
  /** Explicit hash seed when the wash should track an id rather than the name (§09). */
  identifier?: string;
  /** Optional image; the initials wash shows until it loads and if it fails. */
  src?: string;
  /** Accessible name for the avatar. Defaults to `name`. */
  alt?: string;
  /** Presence dot — pass ONLY when presence means something (§09). */
  presence?: AvatarPresence;
}

/**
 * Avatar — a person or entity's picture, or initials on a deterministic semantic
 * wash derived from a hash of the identifier (§09). The wash is NEVER random: the
 * same identifier always resolves to the same color. The presence dot appears only
 * where presence is meaningful. Use AvatarGroup to stack several with a "+n" counter.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 24, name = "", identifier, src, alt, presence, className, ...props },
  ref,
) {
  const seed = identifier ?? name ?? alt ?? "";
  const initials = initialsFrom(name || alt || "");
  const accessibleName = alt ?? name;

  return (
    <span
      ref={ref}
      className={cn("relative inline-flex shrink-0", avatarSizeClasses[size].split(" ")[0])}
      {...props}
    >
      <BaseAvatar.Root
        role="img"
        aria-label={accessibleName || undefined}
        className={cn(
          "flex size-full select-none items-center justify-center overflow-hidden rounded-full",
          "bg-surface-hover font-medium leading-none",
          avatarSizeClasses[size],
          className,
        )}
      >
        {src ? (
          <BaseAvatar.Image src={src} alt="" className="size-full object-cover" />
        ) : null}
        <BaseAvatar.Fallback
          aria-hidden
          className={cn("flex size-full items-center justify-center", washFor(seed))}
        >
          {initials}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      {presence ? (
        <span
          data-presence={presence}
          role="img"
          aria-label={presence === "online" ? "Online" : "Offline"}
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-surface",
            size >= 32 ? "size-2.5" : "size-2",
            presence === "online" ? "bg-success" : "bg-border-strong",
          )}
        />
      ) : null}
    </span>
  );
});
