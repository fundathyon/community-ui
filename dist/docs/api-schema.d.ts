import { type HTMLAttributes, type ReactNode } from "react";
/** A node of an object schema (§26). Recursive: objects carry `properties`,
 * arrays carry `items`. */
export interface SchemaNode {
    name?: string;
    type: string;
    description?: ReactNode;
    required?: boolean;
    /** Allowed literal values — rendered as small Badges. */
    enum?: string[];
    /** Object fields. */
    properties?: SchemaNode[];
    /** Array element schema. */
    items?: SchemaNode;
}
export interface ApiSchemaProps extends HTMLAttributes<HTMLDivElement> {
    schema: SchemaNode;
    /** "required" marker label. Overridable (products ship Spanish copy). */
    requiredLabel?: string;
    /** Accessible names for the expand/collapse toggles. Overridable. */
    expandLabel?: string;
    collapseLabel?: string;
}
/**
 * ApiSchema — an object schema as an expandable tree (§26). Each node shows a
 * monospace name, a muted type, a "required" marker and any `enum` values as
 * small Badges; nested objects and arrays collapse behind a chevron (top level
 * open by default). The unified schema view — see `PropertyTable` for a flat
 * property list and `EnumTable` for a value list, both sharing these internals.
 */
export declare function ApiSchema({ schema, requiredLabel, expandLabel, collapseLabel, className, ...props }: ApiSchemaProps): import("react").JSX.Element;
export interface PropertyRow {
    name: string;
    type: string;
    description?: ReactNode;
    required?: boolean;
}
export interface PropertyTableProps extends HTMLAttributes<HTMLDivElement> {
    rows: PropertyRow[];
    requiredLabel?: string;
    headers?: {
        name?: string;
        type?: string;
        description?: string;
    };
}
/**
 * PropertyTable — a flat property list (§26): the tabular preset of ApiSchema for
 * a single object with no nesting. Name (monospace + "required" Badge), type
 * and description. Server-safe rendering; shares the API table internals.
 */
export declare function PropertyTable({ rows, requiredLabel, headers, className, ...props }: PropertyTableProps): import("react").JSX.Element;
export interface EnumRow {
    value: string;
    description?: ReactNode;
}
export interface EnumTableProps extends HTMLAttributes<HTMLDivElement> {
    values: EnumRow[];
    headers?: {
        value?: string;
        description?: string;
    };
}
/**
 * EnumTable — an enumeration's values and their meaning (§26): the value-list
 * preset sharing the API table internals. Values render monospace. Server-safe.
 */
export declare function EnumTable({ values, headers, className, ...props }: EnumTableProps): import("react").JSX.Element;
