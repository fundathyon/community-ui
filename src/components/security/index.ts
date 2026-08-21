// Security (§20, §23, §24) — sessions, devices, keys, scopes, roles,
// sensitivity levels, permission matrix, the audit-event row and its value
// diffs. Composable pieces over the Wave-1 primitives.
export {
  SessionItem,
  SessionList,
  type DeviceType,
  type SessionItemProps,
  type SessionListProps,
} from "./session-item";
export { DeviceItem, DeviceList, type DeviceItemProps, type DeviceListProps } from "./device-item";
export { ApiKeyItem, ApiKeyList, type ApiKeyItemProps, type ApiKeyListProps } from "./api-key-item";
export { TokenReveal, type TokenRevealProps } from "./token-reveal";
export { ScopeBadge, scopeTone, type ScopeBadgeProps } from "./scope-badge";
export { RoleBadge, roleTone, type RoleBadgeProps } from "./role-badge";
export {
  SensitivityBadge,
  isSensitivityLevel,
  sensitivityTone,
  type SensitivityLevel,
  type SensitivityBadgeProps,
} from "./sensitivity-badge";
export {
  PermissionMatrix,
  type PermissionMatrixEntry,
  type PermissionMatrixLabels,
  type PermissionMatrixProps,
} from "./permission-matrix";
export {
  AuditEvent,
  SecurityEvent,
  type AuditEventProps,
  type SecurityEventActor,
  type SecurityEventProps,
  type SecurityEventTechnical,
} from "./security-event";
export { ValueDiff, type ValueDiffProps } from "./value-diff";
