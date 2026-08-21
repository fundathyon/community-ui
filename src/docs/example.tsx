import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Tab, Tabs, TabsList, TabsPanel } from "../components/navigation/tabs";

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
export function Example({
  label = "Example",
  title,
  children,
  code,
  previewLabel = "Preview",
  codeLabel = "Code",
  className,
  ...props
}: ExampleProps) {
  const hasPreview = children !== undefined && children !== null;
  const hasCode = code !== undefined && code !== null;

  const preview = <div className="bg-bg-subtle p-4 text-sm leading-[1.7]">{children}</div>;

  return (
    <figure className={cn("my-6 overflow-hidden rounded-xl border border-border", className)} {...props}>
      <figcaption className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <span className="text-overline uppercase text-text-muted">{label}</span>
        {title !== undefined && <span className="text-body-sm text-text-secondary">{title}</span>}
      </figcaption>
      {hasPreview && hasCode ? (
        <Tabs defaultValue="preview" className="gap-0">
          <TabsList aria-label={typeof label === "string" ? label : "Example"} className="px-3 pt-2">
            <Tab value="preview">{previewLabel}</Tab>
            <Tab value="code">{codeLabel}</Tab>
          </TabsList>
          <TabsPanel value="preview">{preview}</TabsPanel>
          <TabsPanel value="code" className="p-3">
            {code}
          </TabsPanel>
        </Tabs>
      ) : hasCode ? (
        <div className="p-3">{code}</div>
      ) : (
        preview
      )}
    </figure>
  );
}
