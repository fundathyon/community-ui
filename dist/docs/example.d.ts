import type { HTMLAttributes, ReactNode } from "react";
export interface ExampleProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Header label. §26: "Ejemplo" — neutral, no color; NOT an admonition.
     * Defaults to English "Example", overridable. */
    label?: ReactNode;
    /** Optional secondary title next to the label. */
    title?: ReactNode;
    /** The rendered preview (the demo). Sits on `bg-subtle`. */
    children?: ReactNode;
    /** Optional source, typically a `CodeBlock`. When BOTH a preview and code are
     * given, they split into Preview/Code tabs. */
    code?: ReactNode;
    /** Tab labels when both preview and code are shown. Overridable. */
    previewLabel?: string;
    codeLabel?: string;
}
/**
 * Example — a framed demonstration block (§26). Neutral by design: it is NOT a
 * callout, so it carries no tone or color — reserve those for admonitions.
 *
 * - preview only  → the demo on `bg-subtle`.
 * - code only     → just the source.
 * - both          → Preview/Code tabs over the same example.
 *
 * Server-component safe.
 */
export declare function Example({ label, title, children, code, previewLabel, codeLabel, className, ...props }: ExampleProps): import("react").JSX.Element;
