import type { ThemeChoice } from "../lib/types";

export interface ThemeScriptProps {
  /** Must match the ThemeProvider's storageKey. */
  storageKey?: string;
  defaultTheme?: ThemeChoice;
}

/**
 * Inline script that applies the stored theme BEFORE first paint — place it in
 * `<head>` (in Next.js: inside the root layout's `<html>`) to avoid a flash of
 * the wrong theme on SSR. Server-safe: renders a plain <script> tag.
 */
export function ThemeScript({ storageKey = "fdn-theme", defaultTheme = "system" }: ThemeScriptProps) {
  const code = `(function(){try{var k=${JSON.stringify(storageKey)};var d=${JSON.stringify(defaultTheme)};var t=localStorage.getItem(k)||d;if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-fdn-theme",t)}else{document.documentElement.removeAttribute("data-fdn-theme")}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
