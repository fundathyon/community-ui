import { type ReactNode } from "react";
import { type ButtonProps } from "../actions/button";
/** The SSO providers that ship a built-in glyph; any other string is accepted
 * and falls back to a generic key icon. */
export type OAuthProvider = "google" | "github" | "gitlab" | "microsoft" | "sso" | (string & {});
export interface OAuthProviderButtonProps extends Omit<ButtonProps, "variant" | "leading" | "children"> {
    /** Known providers get a built-in glyph and label; any string works. */
    provider: OAuthProvider;
    /** Overrides the default "Continue with {Provider}". */
    label?: ReactNode;
    /** Overrides the built-in glyph (e.g. a custom SSO logo). */
    icon?: ReactNode;
}
/**
 * OAuthProviderButton — a single SSO / social sign-in button (§16). Full-width
 * secondary, with a monochrome provider glyph and "Continue with {Provider}"
 * copy. Alternative methods live UNDER the divider, in secondary — the accent
 * stays on the one primary CTA above (§16, §29).
 *
 * Glyphs are intentionally monochrome (`currentColor`) for DS sobriety; pass
 * `icon` if a product needs its own mark.
 */
export declare const OAuthProviderButton: import("react").ForwardRefExoticComponent<OAuthProviderButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface OAuthProviderGroupProps {
    /** A stack of OAuthProviderButton (and/or PasskeyButton) elements. */
    children: ReactNode;
    className?: string;
}
/** OAuthProviderGroup — vertical stack of provider buttons with consistent
 * spacing. Server-component safe. */
export declare function OAuthProviderGroup({ children, className }: OAuthProviderGroupProps): import("react").JSX.Element;
export interface AuthDividerProps {
    /** Centered label between the two lines. */
    label?: ReactNode;
    className?: string;
}
/**
 * AuthDivider — the labeled "or" separator between the primary CTA and the
 * alternative methods (§16). A thin wrapper over the labeled Separator.
 * Server-component safe.
 */
export declare function AuthDivider({ label, className }: AuthDividerProps): import("react").JSX.Element;
