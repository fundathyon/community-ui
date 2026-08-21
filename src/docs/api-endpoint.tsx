import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { HttpRequest, type HttpMethod } from "../components/dev/http-request";
import { DeprecationNotice, VersionBadge, type DeprecationInfo } from "./version-badge";

/**
 * New / beta / deprecated lifecycle state for an endpoint's heading (§26).
 * The `deprecated` variant requires `removedIn` and `alternative` at the type
 * level (via `DeprecationInfo`) — §26 "Una deprecación sin fecha de retirada
 * y sin alternativa no se publica": a half-filled deprecation doesn't compile.
 */
export type ApiEndpointStatus =
  | { kind: "new"; version: string }
  | { kind: "beta" }
  | ({ kind: "deprecated" } & DeprecationInfo);

export interface ApiEndpointProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** HTTP verb — colored by effect via the reused HttpRequest chip (§20). */
  method: HttpMethod;
  /** Endpoint path, e.g. "/v1/configs". */
  path: string;
  /** One-line description under the method/path row. */
  description?: ReactNode;
  /** New / beta / deprecated lifecycle state (§26). Renders a VersionBadge by
   * the heading and, when deprecated, a DeprecationNotice immediately below it. */
  status?: ApiEndpointStatus;
  /** Parameter / request / response sections for this endpoint. */
  children?: ReactNode;
}

/**
 * ApiEndpoint — the heading block of an API-reference entry (§26). Reuses the
 * dev HttpRequest row for the method chip + monospace path (so the verb tones
 * stay identical to the product, §20), adds an optional description, an
 * optional lifecycle VersionBadge, and — when deprecated — a DeprecationNotice,
 * then renders its parameter/request/response children.
 *
 * §26: the version badge sits by the endpoint heading, and the deprecation
 * notice immediately below it — never at the foot of the page. Server-safe.
 */
export function ApiEndpoint({
  method,
  path,
  description,
  status,
  className,
  children,
  ...props
}: ApiEndpointProps) {
  return (
    <section className={cn("my-6", className)} {...props}>
      {status && (
        <div className="mb-2">
          <VersionBadge state={status.kind} version={status.kind === "new" ? status.version : undefined} />
        </div>
      )}
      <HttpRequest method={method} path={path} />
      {status?.kind === "deprecated" && (
        <DeprecationNotice
          version={status.version}
          removedIn={status.removedIn}
          removedInEta={status.removedInEta}
          alternative={status.alternative}
        />
      )}
      {description !== undefined && (
        <p className="mt-2 text-sm leading-[1.7] text-text-secondary">{description}</p>
      )}
      {children && <div className="mt-4 flex flex-col gap-4">{children}</div>}
    </section>
  );
}
