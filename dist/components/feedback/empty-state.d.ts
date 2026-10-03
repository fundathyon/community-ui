import { type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
export type EmptyStateKind = "empty" | "no-results";
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /**
     * `empty` — first time, nothing exists yet: primary action to create/sync.
     * `no-results` — filters/search matched nothing. NOT the same state (§11):
     * the data exists; the exit is "clear filters", not "create".
     */
    kind?: EmptyStateKind;
    /** 20px icon in a subtle circle. Defaults per kind (Inbox / SearchX). */
    icon?: LucideIcon;
    title: ReactNode;
    /** Three sentences maximum (§11). */
    description?: ReactNode;
    /** The one exit every empty state must offer (§11). Pass a Button. */
    action?: ReactNode;
    /** Optional secondary exit (e.g. "Ver docs" as a ghost Button or Link). */
    secondaryAction?: ReactNode;
}
/**
 * EmptyState (§11) — three sentences maximum and ALWAYS one exit. "First
 * time" gets a primary action; "no search results" gets "clear filters" and is
 * a different state (`kind="no-results"`), never this component's default.
 * Errors are not empty states — use ErrorState.
 */
export declare function EmptyState({ kind, icon, title, description, action, secondaryAction, className, ...props }: EmptyStateProps): import("react").JSX.Element;
