import type { HTMLAttributes, ReactNode } from "react";
export interface EnvironmentVariableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Variable name — "DATABASE_URL". */
    name: string;
    value: string;
    /** Masks the value and adds the badge marker (§20 env vars). */
    secret?: boolean;
    secretLabel?: string;
    /** Per-row copy — copies `NAME=value` with the FULL value, even when masked. */
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * EnvironmentVariable — one KEY=value row (§20): name in mono medium, value in
 * mono secondary. A `secret` variable renders masked with a badge, but its
 * copy still produces the complete `NAME=value` line — the mask is for eyes,
 * not for clipboards.
 */
export declare function EnvironmentVariable({ name, value, secret, secretLabel, copy, copyLabel, copiedLabel, className, ...props }: EnvironmentVariableProps): import("react").JSX.Element;
export interface EnvironmentVariablesProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    variables: {
        name: string;
        value: string;
        secret?: boolean;
    }[];
    /** Header left — "production/.env". */
    title?: ReactNode;
    /** Header right — "3 variables · 1 secret". */
    meta?: ReactNode;
    secretLabel?: string;
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * EnvironmentVariables — the framed list of EnvironmentVariable rows (§20),
 * with the "production/.env · 3 variables · 1 secret" style header via
 * `title`/`meta`. Secret rows mask on screen but copy complete.
 */
export declare function EnvironmentVariables({ variables, title, meta, secretLabel, copy, copyLabel, copiedLabel, className, ...props }: EnvironmentVariablesProps): import("react").JSX.Element;
