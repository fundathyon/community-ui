import type { LucideIcon } from "lucide-react";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
interface SidebarContextValue {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}
/** Read the sidebar collapse state. Must be used inside `<SidebarProvider>`. */
export declare function useSidebar(): SidebarContextValue;
export interface SidebarProviderProps {
    /** Controlled collapse state. */
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    defaultCollapsed?: boolean;
    /** localStorage key for the per-user preference (§12 "the preference is
     * remembered per user and product"). Pass `null` to disable persistence. */
    storageKey?: string | null;
    children: ReactNode;
}
/**
 * SidebarProvider — owns the collapse state of the suite shell (§12):
 * controlled or uncontrolled, persisted per user/product via `storageKey`,
 * toggled with ⌘B / Ctrl+B from anywhere (suite-wide shortcut, §17 — a
 * product cannot reassign it).
 */
export declare function SidebarProvider({ collapsed: collapsedProp, onCollapsedChange, defaultCollapsed, storageKey, children, }: SidebarProviderProps): import("react").JSX.Element;
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
}
/**
 * Sidebar — the suite shell's left navigation (§12): 208px, collapsible to
 * 48px icons-only. Identical across products; only the destinations change.
 * Must live inside `<SidebarProvider>`.
 */
export declare function Sidebar({ className, children, ...props }: SidebarProps): import("react").JSX.Element;
/** Slot for the product logo/brand, aligned with the 48px shell header (§12). */
export declare function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
    /** Overline group label ("Registry", "Organización"). Visually hidden when
     * collapsed, kept for screen readers. */
    label?: string;
}
/** A group of sidebar items with an optional overline label. */
export declare function SidebarSection({ label, className, children, ...props }: SidebarSectionProps): import("react").JSX.Element;
export interface SidebarItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
    /** REQUIRED — it is all that remains visible when the sidebar collapses. */
    icon: LucideIcon;
    label: string;
    /** This item is the current page: accent wash + 2px bar + `aria-current` (§12). */
    current?: boolean;
    /** Counter badge on the right ("Políticas 3"). Hidden when collapsed. */
    count?: number;
    /** Disabled item. Prefer explaining over disabling — pass `reason`. */
    disabled?: boolean;
    /** Why the item is disabled — surfaced in a tooltip (§12). */
    reason?: string;
    /**
     * Router substitution. Receives the fully-wired props (className, children,
     * aria attributes) — spread them onto the framework link:
     * `render={(props) => <RouterLink to="/repos" {...props} />}`.
     * Renders a plain `<a>` when omitted.
     */
    render?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: ReactNode;
    }) => ReactElement;
}
/**
 * SidebarItem — one destination of the shell (§12). States: default, hover,
 * current (accent wash + 2px accent bar + `aria-current="page"`), disabled
 * with its reason in a tooltip. When the sidebar collapses only the icon
 * remains: the label moves to a right-side tooltip and stays for screen
 * readers.
 */
export declare function SidebarItem({ icon, label, current, count, disabled, reason, render, className, href, onClick, ...props }: SidebarItemProps): import("react").JSX.Element;
/** Bottom region of the sidebar (settings, user, collapse trigger). */
export declare function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Accessible name. Overridable (products ship Spanish copy). */
    label?: string;
}
/**
 * SidebarTrigger — icon button that toggles the sidebar collapse, mirroring
 * the ⌘B shortcut (§12). Exposes `aria-expanded` and its label in a tooltip.
 */
export declare function SidebarTrigger({ label, className, onClick, ...props }: SidebarTriggerProps): import("react").JSX.Element;
export {};
