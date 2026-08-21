import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Card, CardBody } from "../layout/card";
import { Heading } from "../typography/heading";
import { Text } from "../typography/text";

export interface AuthLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Product brand mark shown above the card — a logo, a wordmark, any node.
   * Always the PRODUCT's mark, never Foundathyon's; the house signs in the
   * footer (§29).
   */
  logo?: ReactNode;
  /** Card title — e.g. "Sign in to {product}". */
  title?: ReactNode;
  /** One line under the title: what you're about to manage, not what the
   * product is (§16, §29). */
  subtitle?: ReactNode;
  /** The card contents — usually one of the auth forms. */
  children: ReactNode;
  /** Muted links BELOW the card ("Back to sign in", "Create account"). */
  footer?: ReactNode;
}

/**
 * AuthLayout — the single centered layout for login, registro, recuperación
 * and verificación (§16): a 320px (`w-80`) card on the page background, the
 * product brand on top, an optional title + subtitle, and a muted footer below
 * the card. Same skeleton for every auth screen — only the card content
 * changes, so the five products feel like the same house (§29).
 *
 * It RESPECTS the user's theme — v1's forced-dark login was a bug (§16). The
 * tokens flip themselves, so this renders light when the system asks for light.
 * Never hard-code a dark surface here.
 *
 * Server-component safe.
 */
export function AuthLayout({ logo, title, subtitle, children, footer, className, ...props }: AuthLayoutProps) {
  return (
    <div className={cn("grid min-h-dvh place-items-center bg-bg p-4", className)} {...props}>
      <div className="flex w-80 flex-col gap-6">
        {logo != null && <div className="flex justify-center">{logo}</div>}
        <Card>
          <CardBody className="flex flex-col gap-5">
            {(title != null || subtitle != null) && (
              <div className="flex flex-col gap-1 text-center">
                {title != null && (
                  <Heading level={1} visual="h3">
                    {title}
                  </Heading>
                )}
                {subtitle != null && <Text tone="secondary">{subtitle}</Text>}
              </div>
            )}
            {children}
          </CardBody>
        </Card>
        {footer != null && (
          <div className="flex flex-col items-center gap-2 text-center text-caption text-text-muted">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
