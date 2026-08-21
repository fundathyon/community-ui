import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

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
export function FormSection({ title, description, actions, className, children, ...props }: FormSectionProps) {
  return (
    <section className={cn("flex min-w-0 flex-col gap-4", className)} {...props}>
      <header className="flex flex-col gap-1">
        <h3 className="text-h5 text-text">{title}</h3>
        {description && <p className="text-body-sm text-text-secondary">{description}</p>}
      </header>
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
      {actions && <div className="flex items-center justify-end gap-2">{actions}</div>}
    </section>
  );
}
