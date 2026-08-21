import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tab, Tabs, TabsList, TabsPanel } from "../navigation/tabs";
/**
 * ResourceTabs — navigation Tabs preconfigured for a resource detail (§25): the
 * Resumen / Configuración / Actividad pattern, labels supplied by the app. Tabs
 * switch views of the SAME resource, max five; a different resource belongs in
 * the sidebar. Thin wrapper over the navigation Tabs.
 */
export function ResourceTabs({ tabs, defaultValue, value, onValueChange, className }) {
    const resolvedDefault = defaultValue ?? tabs[0]?.value;
    return (_jsxs(Tabs, { className: className, defaultValue: value === undefined ? resolvedDefault : undefined, value: value, onValueChange: onValueChange, children: [_jsx(TabsList, { children: tabs.map((tab) => (_jsx(Tab, { value: tab.value, count: tab.count, disabled: tab.disabled, children: tab.label }, tab.value))) }), tabs.map((tab) => (_jsx(TabsPanel, { value: tab.value, children: tab.content }, tab.value)))] }));
}
