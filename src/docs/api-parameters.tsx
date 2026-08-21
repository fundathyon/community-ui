import { Fragment, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ApiName, ApiType, RequiredBadge, apiCell, apiHeadCell, apiRowDivider, apiTable, apiTableWrapper } from "./api-shared";

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
  headers?: { name?: string; type?: string; description?: string };
  /** Group heading text per `in` value. Overridable. */
  groupLabels?: Partial<Record<ApiParameterIn, string>>;
  /** Prefix for the default-value note. Overridable. */
  defaultLabel?: string;
}

const IN_ORDER: ApiParameterIn[] = ["path", "query", "header", "body"];
const DEFAULT_GROUP_LABELS: Record<ApiParameterIn, string> = {
  path: "Path parameters",
  query: "Query parameters",
  header: "Headers",
  body: "Body",
};

function ParamRows({
  params,
  requiredLabel,
  defaultLabel,
}: {
  params: ApiParameter[];
  requiredLabel: string;
  defaultLabel: string;
}) {
  return (
    <tbody className={apiRowDivider}>
      {params.map((param) => (
        <tr key={param.name}>
          <td className={cn(apiCell, "whitespace-nowrap")}>
            <div className="flex items-center gap-1.5">
              <ApiName deprecated={param.deprecated}>{param.name}</ApiName>
              {param.required && <RequiredBadge label={requiredLabel} />}
            </div>
          </td>
          <td className={cn(apiCell, "whitespace-nowrap")}>
            <ApiType>{param.type}</ApiType>
            {param.default !== undefined && (
              <div className="mt-0.5 text-caption text-text-muted">
                {defaultLabel} <span className="font-mono">{param.default}</span>
              </div>
            )}
          </td>
          <td className={cn(apiCell, "text-text-secondary")}>{param.description}</td>
        </tr>
      ))}
    </tbody>
  );
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
export function ApiParameters({
  params,
  requiredLabel = "required",
  headers,
  groupLabels,
  defaultLabel = "Default",
  className,
  ...props
}: ApiParametersProps) {
  const head = { name: "Parameter", type: "Type", description: "Description", ...headers };
  const grouped = params.some((param) => param.in !== undefined);

  const groups = grouped
    ? IN_ORDER.map((key) => ({ key, label: groupLabels?.[key] ?? DEFAULT_GROUP_LABELS[key], rows: params.filter((p) => p.in === key) })).filter(
        (group) => group.rows.length > 0,
      )
    : [{ key: "all" as const, label: undefined, rows: params }];

  return (
    <div className={className} {...props}>
      {groups.map((group) => (
        <Fragment key={group.key}>
          {group.label && <div className="mb-1 mt-4 text-label font-medium text-text first:mt-0">{group.label}</div>}
          <div className={apiTableWrapper}>
            <table className={apiTable}>
              <thead>
                <tr>
                  <th className={apiHeadCell}>{head.name}</th>
                  <th className={apiHeadCell}>{head.type}</th>
                  <th className={apiHeadCell}>{head.description}</th>
                </tr>
              </thead>
              <ParamRows params={group.rows} requiredLabel={requiredLabel} defaultLabel={defaultLabel} />
            </table>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
