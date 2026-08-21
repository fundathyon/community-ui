import { type HTMLAttributes, type ReactNode } from "react";
/** Where a parameter travels (§26 groups the table by this). */
export type ApiParameterIn = "path" | "query" | "header" | "body";
export interface ApiParameter {
    name: string;
    type: string;
    required?: boolean;
    /** Default value shown under the type. */
    default?: string;
    description?: ReactNode;
    deprecated?: boolean;
    /** Location — when any parameter sets it, the table splits into `in` groups. */
    in?: ApiParameterIn;
}
export interface ApiParametersProps extends HTMLAttributes<HTMLDivElement> {
    params: ApiParameter[];
    /** "required" marker label. Overridable (products ship Spanish copy). */
    requiredLabel?: string;
    /** Column headers. Overridable. */
    headers?: {
        name?: string;
        type?: string;
        description?: string;
    };
    /** Group heading text per `in` value. Overridable. */
    groupLabels?: Partial<Record<ApiParameterIn, string>>;
    /** Prefix for the default-value note. Overridable. */
    defaultLabel?: string;
}
/**
 * ApiParameters — the parameter table of an endpoint (§26). Name (monospace,
 * with a "required" Badge), type (muted monospace, with any default), and a
 * prose description. When parameters carry an `in` (path/query/header/body) the
 * table splits into labelled groups, in that order.
 *
 * Built from a plain `<table>` with the app's table styling — the Table/DataTable
 * primitives belong to the parallel data-table domain and are never imported
 * here. Server-component safe.
 */
export declare function ApiParameters({ params, requiredLabel, headers, groupLabels, defaultLabel, className, ...props }: ApiParametersProps): import("react").JSX.Element;
