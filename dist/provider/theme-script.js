import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Inline script that applies the stored theme BEFORE first paint — place it in
 * `<head>` (in Next.js: inside the root layout's `<html>`) to avoid a flash of
 * the wrong theme on SSR. Server-safe: renders a plain <script> tag.
 */
export function ThemeScript({ storageKey = "fdn-theme", defaultTheme = "system" }) {
    const code = `(function(){try{var k=${JSON.stringify(storageKey)};var d=${JSON.stringify(defaultTheme)};var t=localStorage.getItem(k)||d;if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-fdn-theme",t)}else{document.documentElement.removeAttribute("data-fdn-theme")}}catch(e){}})();`;
    return _jsx("script", { dangerouslySetInnerHTML: { __html: code } });
}
