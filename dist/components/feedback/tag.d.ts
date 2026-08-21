import type { HTMLAttributes, ReactNode } from "react";
export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The tag's label. */
    children: ReactNode;
    /** Renders a dismiss control when present; omit for a read-only tag. */
    onRemove?: () => void;
    /** Accessible name for the remove control. Defaults to "Remove {children}"
     * when the label is plain text, otherwise the generic "Remove". Overridable
     * product copy. */
    removeLabel?: string;
}
/**
 * Tag — data the USER edits: image tags, project labels, applied filters
 * (§09). Shares Badge's visual scale but is a distinct component: Badge is
 * state the system decides, Tag is user data, and the two are never
 * interchanged. Pass `onRemove` to render a dismiss control; omit it for a
 * read-only tag. Carries no `tone` — state semantics stay on Badge.
 */
export declare function Tag({ children, onRemove, removeLabel, className, ...props }: TagProps): import("react").JSX.Element;
