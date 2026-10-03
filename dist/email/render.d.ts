/**
 * Server-side email rendering.
 *
 * SERVER-ONLY MODULE: statically imports `react-dom/server`, so import the
 * `@foundathyon/community-ui/email` entry only from server code — API routes,
 * queue workers, build scripts. Never bundle it into client components.
 */
import type { ReactElement } from "react";
/**
 * Renders an email element (an `EmailLayout` tree or any template) to the
 * final HTML string, doctype included — the exact payload to hand to your
 * mail provider. Static markup: no hydration comments, no React attributes.
 */
export declare function renderEmail(element: ReactElement): string;
