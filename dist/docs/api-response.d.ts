import type { HTMLAttributes, ReactNode } from "react";
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
export declare function ApiResponse({ status, statusText, title, children, className, ...props }: ApiResponseProps): import("react").JSX.Element;
