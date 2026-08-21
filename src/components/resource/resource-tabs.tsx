import type { ReactNode } from "react";
import { Tab, Tabs, TabsList, TabsPanel } from "../navigation/tabs";

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
export function ResourceTabs({ tabs, defaultValue, value, onValueChange, className }: ResourceTabsProps) {
  const resolvedDefault = defaultValue ?? tabs[0]?.value;
  return (
    <Tabs
      className={className}
      defaultValue={value === undefined ? resolvedDefault : undefined}
      value={value}
      onValueChange={onValueChange}
    >
      <TabsList>
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} count={tab.count} disabled={tab.disabled}>
            {tab.label}
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value}>
          {tab.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}
