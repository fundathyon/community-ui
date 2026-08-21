/**
 * Typographic helpers for email bodies — the only three text levels emails
 * use (§27): heading 20/28·600, body 14/22, small 12/18. Inline styles only.
 */
import type { ReactNode } from "react";
import {
  FONT_SANS,
  palette,
  TYPE_BODY,
  TYPE_HEADING,
  TYPE_SMALL,
} from "./palette";

type EmailAlign = "left" | "center" | "right";

export interface EmailTextProps {
  /** `body` 14/22 (default) or `small` 12/18. */
  size?: "body" | "small";
  /** Hex override; defaults to the primary text color. */
  color?: string;
  align?: EmailAlign;
  children?: ReactNode;
}

/**
 * Body paragraph for email content. Use for every sentence of copy; never
 * emit a bare `<p>` (clients strip un-styled defaults). One idea per paragraph.
 */
export function EmailText({
  size = "body",
  color,
  align,
  children,
}: EmailTextProps) {
  const type = size === "small" ? TYPE_SMALL : TYPE_BODY;
  return (
    <p
      style={{
        margin: "0 0 16px",
        fontFamily: FONT_SANS,
        fontSize: type.fontSize,
        lineHeight: type.lineHeight,
        color: color ?? palette.text,
        textAlign: align,
      }}
    >
      {children}
    </p>
  );
}

export interface EmailHeadingProps {
  align?: EmailAlign;
  children?: ReactNode;
}

/**
 * The single heading of an email — one per message, right under the header.
 * 20/28 at weight 600 (§03 forbids 700 below 15px; 600 everywhere here).
 */
export function EmailHeading({ align, children }: EmailHeadingProps) {
  return (
    <h1
      style={{
        margin: "0 0 12px",
        fontFamily: FONT_SANS,
        fontSize: TYPE_HEADING.fontSize,
        lineHeight: TYPE_HEADING.lineHeight,
        fontWeight: TYPE_HEADING.fontWeight,
        color: palette.text,
        textAlign: align,
      }}
    >
      {children}
    </h1>
  );
}

export interface EmailMutedProps {
  align?: EmailAlign;
  children?: ReactNode;
}

/**
 * Muted small text — security notes, expiry hints, request metadata.
 * 12/18 in `--fdn-text-muted`; still AA on the surface.
 */
export function EmailMuted({ align, children }: EmailMutedProps) {
  return (
    <EmailText size="small" color={palette.textMuted} align={align}>
      {children}
    </EmailText>
  );
}
