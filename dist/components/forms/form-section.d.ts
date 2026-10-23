import type { HTMLAttributes, ReactNode } from "react";
export interface FormSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** Section title (h5 level). */
    title: ReactNode;
    /** One line explaining what this section controls. */
    description?: ReactNode;
    /** Section-level actions — typically its own Save button (§16). */
    actions?: ReactNode;
    children: ReactNode;
}
/**
 * FormSection — one titled block of a settings page (§16 Ajustes): title,
 * description, one FormField per line and SAVE PER SECTION — never a single
 * global Save at the bottom of a long page. Long forms are split into
 * sections like this one, warning on leave with unsaved changes (§17).
 *
 * Server-component safe. The danger zone goes last, with a `danger` border
 * and its own confirmation (§16).
 */
export declare function FormSection({ title, description, actions, className, children, ...props }: FormSectionProps): import("react").JSX.Element;
