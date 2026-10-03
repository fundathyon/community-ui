import type { HTMLAttributes, ReactNode } from "react";
export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** Breadcrumb slot — only on nested views (§12). */
    breadcrumb?: ReactNode;
    /** Page title, rendered as `h1` on `text-h1` (§03: "h1 30 — Repositorios"). */
    title: ReactNode;
    /** ONE line explaining what this screen is about. */
    subtitle?: ReactNode;
    /** THE primary action of the screen lives here — never floating, never at
     * the end of the scroll (§15). */
    actions?: ReactNode;
    /** Search, filters, view switches — the row under the title. */
    toolbar?: ReactNode;
}
/**
 * PageHeader — the fixed page-top structure of every screen (§15):
 * breadcrumb → title + primary action → subtitle → toolbar. Exported apart
 * from PageLayout so shells with their own scroll containers can compose it.
 *
 * Server-component safe.
 */
export declare function PageHeader({ breadcrumb, title, subtitle, actions, toolbar, className, ...props }: PageHeaderProps): import("react").JSX.Element;
export interface PageLayoutProps extends PageHeaderProps {
    /** The screen content, below the header. */
    children?: ReactNode;
}
/**
 * PageLayout — the fixed order of every screen of the suite (§15):
 * breadcrumb, title, subtitle, primary action, toolbar, content. Consistency
 * here is what makes five products feel like one suite.
 *
 * Server-component safe.
 */
export declare function PageLayout({ breadcrumb, title, subtitle, actions, toolbar, className, children, ...props }: PageLayoutProps): import("react").JSX.Element;
