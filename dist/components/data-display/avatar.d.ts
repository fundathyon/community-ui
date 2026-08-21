import { type HTMLAttributes } from "react";
/** Avatar scale (§04): 20 · 24 (default) · 32 · 40. */
export type AvatarSize = 20 | 24 | 32 | 40;
/** Presence — rendered ONLY where presence carries meaning (§09). */
export type AvatarPresence = "online" | "offline";
/** Size → box + initials type scale. Exported for AvatarGroup's counter, not the barrel. */
export declare const avatarSizeClasses: Record<AvatarSize, string>;
/** Pick a wash from the identifier — same identifier → same wash, always. */
export declare function washFor(identifier: string): string;
/** Initials from a display name: two words → first+last; email/single → sensible fallback. */
export declare function initialsFrom(name: string): string;
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
export declare const Avatar: import("react").ForwardRefExoticComponent<AvatarProps & import("react").RefAttributes<HTMLSpanElement>>;
