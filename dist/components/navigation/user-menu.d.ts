import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
export interface UserMenuItem {
    label: string;
    icon?: LucideIcon;
    onSelect?: () => void;
    /** Destructive entry — danger text, at the END of its group (§12). */
    destructive?: boolean;
}
export interface UserMenuProps {
    name: string;
    email?: string;
    /** Custom trigger node. Defaults to an initials circle computed from `name`. */
    trigger?: ReactNode;
    items?: UserMenuItem[];
    /** Renders the separated sign-out item at the bottom. */
    onSignOut?: () => void;
    /** Overridable (products ship Spanish copy: "Cerrar sesión"). */
    signOutLabel?: string;
    /** Identity block (name/email) at the top of the menu. */
    showHeader?: boolean;
}
/**
 * UserMenu — the shell's identity menu (§12): avatar-like trigger, identity
 * header, account items, and sign out separated at the bottom. Destructive
 * entries never sit next to safe ones without a separator.
 */
export declare function UserMenu({ name, email, trigger, items, onSignOut, signOutLabel, showHeader, }: UserMenuProps): import("react").JSX.Element;
