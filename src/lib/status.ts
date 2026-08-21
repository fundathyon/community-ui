import {
  Archive,
  Ban,
  Check,
  CircleAlert,
  Clock,
  Lock,
  Pencil,
  RefreshCw,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ToneOrNeutral } from "./types";

/**
 * State taxonomy (§19) — the ONLY sixteen states allowed across the suite.
 * A product that needs another state proposes it to the system; it never
 * defines one locally. Each state fixes tone, icon, treatment and meaning —
 * and none relies on color alone.
 */
export type StatusKey =
  | "active"
  | "healthy"
  | "protected"
  | "pending"
  | "processing"
  | "syncing"
  | "draft"
  | "degraded"
  | "expiring"
  | "locked"
  | "failed"
  | "expired"
  | "revoked"
  | "disabled"
  | "archived"
  | "unknown";

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

export const STATUS: Record<StatusKey, StatusSpec> = {
  active: { tone: "success", treatment: "tonal", icon: null, dot: true, spinner: false, terminal: false, label: "Active" },
  healthy: { tone: "success", treatment: "tonal", icon: Check, dot: false, spinner: false, terminal: false, label: "Healthy" },
  protected: { tone: "success", treatment: "tonal", icon: ShieldCheck, dot: false, spinner: false, terminal: false, label: "Protected" },
  pending: { tone: "info", treatment: "tonal", icon: null, dot: true, spinner: false, terminal: false, label: "Pending" },
  processing: { tone: "info", treatment: "tonal", icon: null, dot: false, spinner: true, terminal: false, label: "Processing" },
  syncing: { tone: "info", treatment: "tonal", icon: RefreshCw, dot: false, spinner: false, terminal: false, label: "Syncing" },
  draft: { tone: "info", treatment: "tonal", icon: Pencil, dot: false, spinner: false, terminal: false, label: "Draft" },
  degraded: { tone: "warning", treatment: "tonal", icon: CircleAlert, dot: false, spinner: false, terminal: false, label: "Degraded" },
  expiring: { tone: "warning", treatment: "tonal", icon: Clock, dot: false, spinner: false, terminal: false, label: "Expiring" },
  locked: { tone: "warning", treatment: "tonal", icon: Lock, dot: false, spinner: false, terminal: false, label: "Locked" },
  failed: { tone: "danger", treatment: "tonal", icon: X, dot: false, spinner: false, terminal: false, label: "Failed" },
  expired: { tone: "neutral", treatment: "outline", icon: Clock, dot: false, spinner: false, terminal: true, label: "Expired" },
  revoked: { tone: "neutral", treatment: "outline", icon: Ban, dot: false, spinner: false, terminal: true, label: "Revoked" },
  disabled: { tone: "neutral", treatment: "outline", icon: null, dot: false, spinner: false, terminal: true, label: "Disabled" },
  archived: { tone: "neutral", treatment: "outline", icon: Archive, dot: false, spinner: false, terminal: true, label: "Archived" },
  unknown: { tone: "neutral", treatment: "outline-dashed", icon: null, dot: false, spinner: false, terminal: true, label: "Unknown" },
};

export const STATUS_KEYS = Object.keys(STATUS) as StatusKey[];
