"use client";

import { KeyRound } from "lucide-react";
import { forwardRef, type ReactNode, type SVGProps } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../actions/button";
import { Icon } from "../typography/icon";
import { Separator } from "../layout/separator";

/** The SSO providers that ship a built-in glyph; any other string is accepted
 * and falls back to a generic key icon. */
export type OAuthProvider = "google" | "github" | "gitlab" | "microsoft" | "sso" | (string & {});

function Glyph(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden focusable={false} {...props} />;
}

/**
 * Monochrome brand glyphs (`fill: currentColor`). The DS keeps auth buttons
 * sober — no brand colors — so these inherit the button's text color instead of
 * Google red / GitLab orange (§05, §16).
 */
const GLYPHS: Record<string, ReactNode> = {
  google: (
    <Glyph>
      <path d="M12 11v2.9h4.03c-.16 1.05-1.22 3.06-4.03 3.06A4.48 4.48 0 0 1 7.5 12.5 4.48 4.48 0 0 1 12 8.04c1.37 0 2.29.58 2.82 1.09l1.93-1.86C15.5 6.03 13.9 5.34 12 5.34a7.16 7.16 0 0 0 0 14.32c4.13 0 6.86-2.9 6.86-6.99 0-.47-.05-.83-.11-1.19H12z" />
    </Glyph>
  ),
  github: (
    <Glyph>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
    </Glyph>
  ),
  gitlab: (
    <Glyph>
      <path d="M23.95 13.59l-1.34-4.14-2.66-8.19a.46.46 0 0 0-.87 0l-2.66 8.19H7.58L4.92 1.26a.46.46 0 0 0-.87 0L1.39 9.45.05 13.59a.92.92 0 0 0 .33 1.03L12 23.05l11.62-8.43a.92.92 0 0 0 .33-1.03z" />
    </Glyph>
  ),
  microsoft: (
    <Glyph>
      <path d="M11.4 11.4H0V0h11.4zM24 11.4H12.6V0H24zM11.4 24H0V12.6h11.4zM24 24H12.6V12.6H24z" />
    </Glyph>
  ),
};

/** Default label suffix per provider ("Continue with GitHub"). */
const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  gitlab: "GitLab",
  microsoft: "Microsoft",
  sso: "SSO",
};

function providerLabel(provider: string): string {
  return PROVIDER_LABELS[provider] ?? provider.charAt(0).toUpperCase() + provider.slice(1);
}

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
export const OAuthProviderButton = forwardRef<HTMLButtonElement, OAuthProviderButtonProps>(
  function OAuthProviderButton({ provider, label, icon, size = "lg", className, ...props }, ref) {
    const glyph = icon ?? GLYPHS[provider] ?? <Icon icon={KeyRound} size={16} />;
    return (
      <Button
        ref={ref}
        variant="secondary"
        size={size}
        leading={glyph}
        className={cn("w-full", className)}
        {...props}
      >
        {label ?? `Continue with ${providerLabel(provider)}`}
      </Button>
    );
  },
);

export interface OAuthProviderGroupProps {
  /** A stack of OAuthProviderButton (and/or PasskeyButton) elements. */
  children: ReactNode;
  className?: string;
}

/** OAuthProviderGroup — vertical stack of provider buttons with consistent
 * spacing. Server-component safe. */
export function OAuthProviderGroup({ children, className }: OAuthProviderGroupProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

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
export function AuthDivider({ label = "or", className }: AuthDividerProps) {
  return <Separator label={label} className={className} />;
}
