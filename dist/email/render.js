import { renderToStaticMarkup } from "react-dom/server";
/**
 * Renders an email element (an `EmailLayout` tree or any template) to the
 * final HTML string, doctype included — the exact payload to hand to your
 * mail provider. Static markup: no hydration comments, no React attributes.
 */
export function renderEmail(element) {
    return "<!DOCTYPE html>" + renderToStaticMarkup(element);
}
