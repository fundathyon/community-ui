/**
 * Server-side email rendering.
 *
 * SERVER-ONLY MODULE: statically imports `react-dom/server`, so import the
 * `@foundathyon/community-ui/email` entry only from server code — API routes,
 * queue workers, build scripts. Never bundle it into client components.
 */
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * Renders an email element (an `EmailLayout` tree or any template) to the
 * final HTML string, doctype included — the exact payload to hand to your
 * mail provider. Static markup: no hydration comments, no React attributes.
 */
export function renderEmail(element: ReactElement): string {
  return "<!DOCTYPE html>" + renderToStaticMarkup(element);
}
