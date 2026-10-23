import type { LucideIcon } from "lucide-react";
/** Icon sizes (§07): 14 accompanies 12–13px text; 16 for nav items; 20 only in
 * empty states and dialog headers; 12 inside badges and dense cells. */
export type IconSize = 12 | 14 | 16 | 20;
export interface IconProps {
    /** A Lucide icon component — the only icon set of the suite. */
    icon: LucideIcon;
    size?: IconSize;
    /**
     * Accessible name. Omit for decorative icons (they get `aria-hidden`).
     * An icon that is the ONLY content of a control must be labelled — use
     * IconButton, which enforces it.
     */
    label?: string;
    className?: string;
}
/**
 * The single way to render an icon: Lucide, 1.5px stroke without exception,
 * inheriting `currentColor`. The stroke does not scale with size.
 *
 * Server-component safe.
 */
export declare function Icon({ icon: IconComponent, size, label, className }: IconProps): import("react").JSX.Element;
