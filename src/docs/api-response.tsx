import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { statusTone } from "../components/dev/http-response";
import { Badge } from "../components/feedback/badge";

export interface ApiResponseProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** HTTP status code — decides the chip tone via the dev `statusTone` (§20). */
  status: number;
  /** "OK", "Conflict"… shown next to the code. */
  statusText?: string;
  /** Section label. Overridable (products ship Spanish "Respuesta"). */
  title?: ReactNode;
  /** The response example — typically a CodeBlock or JsonViewer from the dev domain. */
  children?: ReactNode;
}

/**
 * ApiResponse — the response-example block of an endpoint (§26). A titled
 * section headed by a status chip whose tone follows the effect rule (2xx
 * success · 3xx info · 4xx warning · 5xx danger) via the reused dev `statusTone`,
 * then the body (a JsonViewer or CodeBlock from the dev domain).
 *
 * Server-component safe.
 */
export function ApiResponse({ status, statusText, title = "Response", children, className, ...props }: ApiResponseProps) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <span className="text-label font-medium text-text">{title}</span>
        <Badge variant="tonal" tone={statusTone(status)} className="font-mono tabular-nums">
          {status}
          {statusText ? ` ${statusText}` : ""}
        </Badge>
      </div>
      {children}
    </section>
  );
}
