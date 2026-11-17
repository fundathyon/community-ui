import type { ReactNode } from "react";
export interface ResourceTab {
    value: string;
    label: ReactNode;
    /** Optional counter badge after the label. */
    count?: number;
    content: ReactNode;
    disabled?: boolean;
}
export interface ResourceTabsProps {
    /** The tabs — the app supplies the labels (Resumen / Configuración / Actividad…). */
    tabs: ResourceTab[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}
/**
 * ResourceTabs — navigation Tabs preconfigured for a resource detail (§25): the
 * Resumen / Configuración / Actividad pattern, labels supplied by the app. Tabs
 * switch views of the SAME resource, max five; a different resource belongs in
 * the sidebar. Thin wrapper over the navigation Tabs.
 */
export declare function ResourceTabs({ tabs, defaultValue, value, onValueChange, className }: ResourceTabsProps): import("react").JSX.Element;
