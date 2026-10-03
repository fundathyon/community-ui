import { type HTMLAttributes } from "react";
import { type AvatarSize } from "./avatar";
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
export declare function AvatarGroup({ max, size, className, children, ...props }: AvatarGroupProps): import("react").JSX.Element;
