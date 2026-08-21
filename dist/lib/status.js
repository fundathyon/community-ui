import { Archive, Ban, Check, CircleAlert, Clock, Lock, Pencil, RefreshCw, ShieldCheck, X, } from "lucide-react";
export const STATUS = {
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
export const STATUS_KEYS = Object.keys(STATUS);
