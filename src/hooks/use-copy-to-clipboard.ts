"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseCopyToClipboardOptions {
  /** How long `copied` stays true, in ms. */
  resetAfter?: number;
}

/**
 * Copies `text` to the clipboard and resolves whether it worked.
 *
 * The async Clipboard API only exists in secure contexts (HTTPS, localhost).
 * Apps served over plain HTTP — internal consoles behind a VPN, such as
 * http://helm.foundathyon.internal — have no `navigator.clipboard`, so on its
 * own every copy failed silently there. When the API is missing or rejects,
 * this falls back to a hidden textarea and `document.execCommand("copy")`,
 * which browsers still honor inside a user gesture on insecure origins.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or document not focused: try the legacy path.
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text: string): boolean {
  if (typeof document === "undefined" || typeof document.execCommand !== "function") return false;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.setAttribute("aria-hidden", "true");
  // Off-screen but still selectable; fixed so the page does not scroll.
  Object.assign(area.style, { position: "fixed", top: "0", left: "-9999px", opacity: "0" });
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  // Inside a modal dialog the textarea must live in the dialog, or its focus
  // trap pulls focus back and the selection is lost.
  const host = previous?.closest("[role=dialog]") ?? document.body;
  host.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  previous?.focus({ preventScroll: true });
  return ok;
}

/**
 * Copy text to the clipboard with a transient `copied` flag for UI feedback.
 * Always copy the FULL value — never a middle-truncated display form (§20).
 * Works on plain HTTP too (see `copyText`).
 */
export function useCopyToClipboard({ resetAfter = 2000 }: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      const ok = await copyText(text);
      setCopied(ok);
      if (timer.current) clearTimeout(timer.current);
      if (ok) timer.current = setTimeout(() => setCopied(false), resetAfter);
      return ok;
    },
    [resetAfter],
  );

  return { copied, copy } as const;
}
