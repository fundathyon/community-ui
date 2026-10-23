import type { HTMLAttributes, ReactNode } from "react";
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
/**
 * ApiRequest — the request-example block of an endpoint (§26). A titled section
 * wrapping the example (a CodeBlock/CurlBlock from the dev domain, which owns
 * code rendering — never ad-hoc `<pre>`), with optional structured headers/body
 * slots above it. Server-component safe.
 */
export declare function ApiRequest({ title, headers, body, children, headersLabel, bodyLabel, className, ...props }: ApiRequestProps): import("react").JSX.Element;
