import { type BreadcrumbProps } from "../components/navigation/breadcrumb";
export interface DocsBreadcrumbProps extends BreadcrumbProps {
}
/**
 * DocsBreadcrumb — the shell Breadcrumb (§12) tuned for the docs content column:
 * same trail semantics and router `render` substitution, at the docs reading
 * size with bottom spacing before the page title. A thin preset — it adds
 * spacing only, never a second breadcrumb implementation. Server-component safe.
 */
export declare function DocsBreadcrumb({ className, ...props }: DocsBreadcrumbProps): import("react").JSX.Element;
