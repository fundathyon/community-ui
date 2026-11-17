import type { IconSize } from "../typography/icon";
export interface SpinnerProps {
    size?: IconSize;
    /**
     * Accessible label announced to screen readers. Pass your product copy
     * (e.g. "Sincronizando…"). Pass `null` when a parent already announces the
     * busy state (e.g. a Button with `loading`).
     */
    label?: string | null;
    className?: string;
}
/**
 * Indeterminate spinner — for a short in-flight action (< 1s expected) or when
 * the shape of the incoming content is unknown. If the shape IS known and the
 * wait exceeds 300ms, use Skeleton instead. Never both at once (§09).
 *
 * Under `prefers-reduced-motion` the rotation becomes a soft opacity pulse.
 * Server-component safe.
 */
export declare function Spinner({ size, label, className }: SpinnerProps): import("react").JSX.Element;
