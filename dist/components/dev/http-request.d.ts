import { type HTMLAttributes, type ReactNode } from "react";
export type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface HttpRequestProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    method: HttpMethod;
    /** Request path — "/v1/users". */
    path: string;
    /** Response status; the chip follows the 2xx/3xx/4xx/5xx tones (§20). */
    status?: number;
    statusText?: string;
    /** Milliseconds — "42 ms", readable units from 1 s up. */
    duration?: number;
    /** Expandable body slot (headers, a JsonViewer…). Adds a disclosure toggle. */
    children?: ReactNode;
    /** Accessible name of the disclosure toggle. */
    toggleLabel?: string;
}
/**
 * HttpRequest — the "GET /v1/users · 200 OK · 42 ms" row (§20). HTTP verbs
 * reuse the semantic tones by their effect — read is info, create/write is
 * success, destroy is danger — never a palette of their own. Optional
 * children expand below the row for the request detail.
 */
export declare function HttpRequest({ method, path, status, statusText, duration, children, toggleLabel, className, ...props }: HttpRequestProps): import("react").JSX.Element;
