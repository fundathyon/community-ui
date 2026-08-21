import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { HttpRequest, type HttpMethod } from "../components/dev/http-request";
import { Badge } from "../components/feedback/badge";

export interface ApiEndpointProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** HTTP verb — colored by effect via the reused HttpRequest chip (§20). */
  method: HttpMethod;
  /** Endpoint path, e.g. "/v1/configs". */
  path: string;
  /** One-line description under the method/path row. */
  description?: ReactNode;
  /** Marks the endpoint deprecated — a warning Badge next to the heading (§26). */
  deprecated?: boolean;
  /** Deprecated Badge label. Overridable (products ship Spanish copy). */
  deprecatedLabel?: string;
  /** Parameter / request / response sections for this endpoint. */
  children?: ReactNode;
}

/**
 * ApiEndpoint — the heading block of an API-reference entry (§26). Reuses the
 * dev HttpRequest row for the method chip + monospace path (so the verb tones
 * stay identical to the product, §20), adds an optional description and a
 * deprecation Badge, then renders its parameter/request/response children.
 *
 * §26: the deprecation Badge sits by the endpoint heading — never at the foot
 * of the page. Server-component safe.
 */
export function ApiEndpoint({
  method,
  path,
  description,
  deprecated = false,
  deprecatedLabel = "Deprecated",
  className,
  children,
  ...props
}: ApiEndpointProps) {
  return (
    <section className={cn("my-6", className)} {...props}>
      {deprecated && (
        <div className="mb-2">
          <Badge variant="outline" tone="warning">
            {deprecatedLabel}
          </Badge>
        </div>
      )}
      <HttpRequest method={method} path={path} />
      {description !== undefined && (
        <p className="mt-2 text-sm leading-[1.7] text-text-secondary">{description}</p>
      )}
      {children && <div className="mt-4 flex flex-col gap-4">{children}</div>}
    </section>
  );
}
