import type { HTMLAttributes } from "react";
import type { Tone } from "../../lib/types";
/**
 * Status → tone (§20): 2xx success, 3xx info, 4xx warning, 5xx danger.
 * 1xx informational maps to info.
 */
export declare function statusTone(status: number): Tone;
/** Internal — shared chip recipe for HTTP method/status (not in the barrel). */
export declare const HTTP_CHIP_CLASS = "inline-flex h-[1.125rem] shrink-0 items-center rounded-sm border px-1.5 font-mono text-caption font-medium leading-none";
/** Internal — tonal chip colors per tone (not in the barrel). */
export declare const HTTP_CHIP_TONE: Record<Tone, string>;
/** Internal — "42 ms" under a second, readable units from there (§21). */
export declare function formatHttpDuration(ms: number): string;
export interface HttpResponseProps extends HTMLAttributes<HTMLDivElement> {
    /** HTTP status code — decides the tone (§20). */
    status: number;
    /** "OK", "Conflict"… rendered inside the chip. */
    statusText?: string;
    /** Milliseconds — "42 ms", or readable units from 1 s up. */
    duration?: number;
}
/**
 * HttpResponse — a response header chip plus body (§20): the status chip
 * follows the effect rule (2xx success · 3xx info · 4xx warning · 5xx danger)
 * instead of a palette of its own. Children typically hold a JsonViewer.
 * Server-component safe.
 */
export declare function HttpResponse({ status, statusText, duration, className, children, ...props }: HttpResponseProps): import("react").JSX.Element;
