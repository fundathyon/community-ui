import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface ApiRequestProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section label. Overridable (products ship Spanish "Petición"). */
  title?: ReactNode;
  /** Optional structured headers slot (e.g. an EnvironmentVariables or table). */
  headers?: ReactNode;
  /** Optional structured body slot. */
  body?: ReactNode;
  /** The request example — typically a CodeBlock or CurlBlock from the dev domain. */
  children?: ReactNode;
  /** Labels for the structured slots. Overridable. */
  headersLabel?: string;
  bodyLabel?: string;
}

function SubSlot({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-overline uppercase text-text-muted">{label}</div>
      {children}
    </div>
  );
}

/**
 * ApiRequest — the request-example block of an endpoint (§26). A titled section
 * wrapping the example (a CodeBlock/CurlBlock from the dev domain, which owns
 * code rendering — never ad-hoc `<pre>`), with optional structured headers/body
 * slots above it. Server-component safe.
 */
export function ApiRequest({
  title = "Request",
  headers,
  body,
  children,
  headersLabel = "Headers",
  bodyLabel = "Body",
  className,
  ...props
}: ApiRequestProps) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="text-label font-medium text-text">{title}</div>
      {headers && <SubSlot label={headersLabel}>{headers}</SubSlot>}
      {body && <SubSlot label={bodyLabel}>{body}</SubSlot>}
      {children}
    </section>
  );
}
