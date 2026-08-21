import { type LucideIcon } from "lucide-react";
import type { ToneOrNeutral } from "./types";
/**
 * State taxonomy (§19) — the ONLY sixteen states allowed across the suite.
 * A product that needs another state proposes it to the system; it never
 * defines one locally. Each state fixes tone, icon, treatment and meaning —
 * and none relies on color alone.
 */
export type StatusKey = "active" | "healthy" | "protected" | "pending" | "processing" | "syncing" | "draft" | "degraded" | "expiring" | "locked" | "failed" | "expired" | "revoked" | "disabled" | "archived" | "unknown";
/** Visual treatment: live states use a tonal fill; terminal states use a gray
 * outline (their row drops to 0.6 opacity); `unknown` is the only dashed badge. */
export type StatusTreatment = "tonal" | "outline" | "outline-dashed";
export interface StatusSpec {
    tone: ToneOrNeutral;
    treatment: StatusTreatment;
    /** Fixed icon across the whole suite — never swapped for one that "fits better".
     * `null` means dot-only (active, pending) or no marker (disabled). */
    icon: LucideIcon | null;
    /** True when the state's marker is a dot rather than an icon. */
    dot: boolean;
    /** True when the state's marker is the inline spinner (processing). */
    spinner: boolean;
    /** Terminal: it already happened (vs. it is happening). */
    terminal: boolean;
    /** Default English label; products pass their own copy via children/label. */
    label: string;
}
export declare const STATUS: Record<StatusKey, StatusSpec>;
export declare const STATUS_KEYS: StatusKey[];
