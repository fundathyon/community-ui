import type { HTMLAttributes } from "react";
export interface SaveBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Number of unsaved changes, shown on the left (§25). */
    count?: number;
    /** Format the count copy — products pass their own ("2 cambios sin guardar"). */
    countLabel?: (count: number) => string;
    onDiscard?: () => void;
    onSave?: () => void;
    /** Discard button copy. Default "Discard". */
    discardLabel?: string;
    /** Save button copy. Default "Save". */
    saveLabel?: string;
    /** Shows the save button's loading state and disables both actions. */
    saving?: boolean;
}
/**
 * SaveBar — the deferred-save affordance for a settings section (§25). It appears
 * attached to the end of the section with the count of unsaved changes; there is
 * NEVER a global "Save" at the bottom of a long settings page. Sticky within its
 * container, on a raised surface with a border and a soft shadow.
 */
export declare function SaveBar({ count, countLabel, onDiscard, onSave, discardLabel, saveLabel, saving, className, ...props }: SaveBarProps): import("react").JSX.Element;
