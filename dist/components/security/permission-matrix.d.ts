import type { HTMLAttributes, ReactNode } from "react";
export interface PermissionMatrixEntry {
    id: string;
    label: ReactNode;
}
export interface PermissionMatrixLabels {
    /** Announced for a granted cell. */
    allowed: string;
    /** Announced for a denied cell. */
    notAllowed: string;
}
export interface PermissionMatrixProps extends Omit<HTMLAttributes<HTMLTableElement>, "children"> {
    /** Rows — the permissions. `label` is display, `id` is used by `granted`. */
    permissions: PermissionMatrixEntry[];
    /** Columns — the roles. */
    roles: PermissionMatrixEntry[];
    /** Whether `roleId` has `permissionId`. */
    granted: (permissionId: string, roleId: string) => boolean;
    /** Copy for the accessible announcements. */
    labels?: PermissionMatrixLabels;
    /** Top-left corner cell (above the permission column). */
    cornerLabel?: ReactNode;
    /** Screen-reader summary of the whole table. */
    caption?: ReactNode;
}
/**
 * PermissionMatrix — the scopes-and-roles grid (§23). A check or an em dash, NO
 * background colors, so it reads identically in monochrome and to a screen
 * reader: every cell announces "{permission} · {role}: allowed / not allowed".
 * The first column is sticky for wide role sets; the table scrolls inside its
 * own container. Server-component safe.
 */
export declare function PermissionMatrix({ permissions, roles, granted, labels, cornerLabel, caption, className, ...props }: PermissionMatrixProps): import("react").JSX.Element;
