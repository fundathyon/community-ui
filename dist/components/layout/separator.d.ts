import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentProps, ReactNode } from "react";
export interface SeparatorProps extends ComponentProps<typeof BaseSeparator> {
    /** Centered label between two lines (§09 "Divider con etiqueta").
     * Horizontal orientation only. */
    label?: ReactNode;
}
/**
 * Separator — a divider accessible to screen readers (`role="separator"`).
 * Plain 1px line, or a labeled variant with a centered caption ("or",
 * "Continue with SSO"). Structure comes from borders, not shadows (§05).
 */
export declare function Separator({ orientation, label, className, ...props }: SeparatorProps): import("react").JSX.Element;
