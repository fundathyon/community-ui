import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * The single way to render an icon: Lucide, 1.5px stroke without exception,
 * inheriting `currentColor`. The stroke does not scale with size.
 *
 * Server-component safe.
 */
export function Icon({ icon: IconComponent, size = 16, label, className }) {
    return (_jsx(IconComponent, { size: size, strokeWidth: 1.5, absoluteStrokeWidth: true, "aria-hidden": label ? undefined : true, role: label ? "img" : undefined, "aria-label": label, className: cn("shrink-0", className) }));
}
