import type { HTMLAttributes } from "react";
/** Accent of the embedded component: neutral, or an OKLCH colour. */
export type SignInPreviewAccent = "neutral" | {
    hue: number;
    l: number;
    c: number;
};
/** Branding an Accounts app sets for its embedded `<accounts-sign-in>`. */
export interface SignInPreviewBranding {
    /** App name shown in the title. Empty → generic "Sign in". */
    name: string;
    /** Logo URL; only https (or http on localhost) is drawn. */
    logoUrl?: string;
    accent: SignInPreviewAccent;
    /** `split` adds the accent panel above the card. @default "card" */
    layout?: "card" | "split";
}
/** What the component would really offer. */
export interface SignInPreviewStrategies {
    password: boolean;
    emailCode: boolean;
    magicLink: boolean;
    /** OAuth provider ids, e.g. `["google", "github"]`. */
    oauth: string[];
}
/** Every string the preview draws. `{app}` and `{provider}` are replaced. */
export interface SignInPreviewLabels {
    title: string;
    titleGeneric: string;
    subtitle: string;
    passwordlessTitle: string;
    passwordlessSubtitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    forgotPassword: string;
    submit: string;
    sendCode: string;
    sendMagicLink: string;
    useCode: string;
    continueWith: string;
    or: string;
    noAccount: string;
    createAccount: string;
    unavailable: string;
    protectedBy: string;
}
export interface SignInPreviewProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    branding: SignInPreviewBranding;
    strategies: SignInPreviewStrategies;
    /** Colour scheme of the previewed component. @default "light" */
    scheme?: "light" | "dark";
    /** Hide the "Secured by Foundathyon Accounts" line. */
    hideBranding?: boolean;
    /** Copy overrides (i18n). Defaults are English. */
    labels?: Partial<SignInPreviewLabels>;
}
/** CSS colour of the accent, as `<accounts-sign-in>` resolves it. */
export declare function signInAccentColor(accent: SignInPreviewAccent, scheme: "light" | "dark"): string;
/** Text colour on top of the accent. */
export declare function signInAccentOnColor(accent: SignInPreviewAccent, scheme: "light" | "dark"): string;
/**
 * SignInPreview — a static picture of the Accounts embedded `<accounts-sign-in>`
 * first screen (320px card, one primary CTA, alternatives and OAuth under the
 * divider). It draws only: no requests, no inputs, `aria-hidden`. Use it to
 * preview branding/strategy settings or to show the component in marketing.
 * For a working sign-in screen, use LoginForm inside AuthLayout (§16).
 *
 * Server-component safe.
 */
export declare function SignInPreview({ branding, strategies, scheme, hideBranding, labels, className, style, ...props }: SignInPreviewProps): import("react").JSX.Element;
