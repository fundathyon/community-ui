import { Check } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

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
export function PermissionMatrix({
  permissions,
  roles,
  granted,
  labels = { allowed: "allowed", notAllowed: "not allowed" },
  cornerLabel,
  caption,
  className,
  ...props
}: PermissionMatrixProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-body-sm", className)} {...props}>
        {caption != null && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-surface px-3 py-2 text-left text-label font-medium text-text-secondary"
            >
              {cornerLabel}
            </th>
            {roles.map((role) => (
              <th key={role.id} scope="col" className="px-3 py-2 text-center text-label font-medium text-text-secondary">
                {role.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="border-b border-border last:border-b-0">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-surface px-3 py-2 text-left text-body-sm font-normal text-text"
              >
                {permission.label}
              </th>
              {roles.map((role) => {
                const ok = granted(permission.id, role.id);
                const announce = `${textOf(permission.label)} · ${textOf(role.label)}: ${ok ? labels.allowed : labels.notAllowed}`;
                return (
                  <td key={role.id} className="px-3 py-2 text-center" aria-label={announce}>
                    {ok ? (
                      <Icon icon={Check} size={16} className="mx-auto text-success" />
                    ) : (
                      <span aria-hidden className="text-text-muted">
                        —
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Best-effort plain text of a label node for the aria announcement. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return props != null ? textOf(props.children) : "";
  }
  return "";
}
