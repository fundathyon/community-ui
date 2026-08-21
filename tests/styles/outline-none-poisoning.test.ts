import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for a Tailwind v4 gotcha: `outline-none` and
 * `focus-visible:outline`/`focus-within:outline` share ONE `--tw-outline-style`
 * custom property. If BOTH land on the same element, `outline-none`'s
 * unconditional declaration always wins that property — even when
 * `:focus-visible`/`:focus-within` matches and its own rule "wins" the
 * `outline-style` cascade, the value it reads back (`var(--tw-outline-style)`)
 * is already pinned to `none`. Net effect: no ring EVER renders, focused or
 * not — worse than the double-ring bug this shares a family with, since jsdom
 * cannot see this either (it doesn't resolve custom-property composition the
 * way a real browser does), so only a source-level check like this one catches
 * it. The fix is always to drop `outline-none` — `@layer utilities` already
 * beats base.css's global ring unconditionally, no reset is needed first.
 *
 * This is fine (and common) when `outline-none` and the focus utility are on
 * TWO DIFFERENT elements (a wrapper painting `focus-within:outline` while an
 * inner input carries `outline-none`) — poisoning is per-element, not
 * inherited. This guard only flags the two on the SAME `cn(...)` call, which
 * means the same element.
 */
describe("no same-element outline-none + focus-visible/within:outline", () => {
  const roots = ["src/components", "src/charts", "src/docs"].map((p) => join(__dirname, "../..", p));

  function collectFiles(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) out.push(...collectFiles(full));
      else if (extname(full) === ".tsx" || extname(full) === ".ts") out.push(full);
    }
    return out;
  }

  /** Extracts the text of every `cn(...)` call, matching nested parens. */
  function extractCnCalls(source: string): string[] {
    const calls: string[] = [];
    const marker = "cn(";
    let searchFrom = 0;
    while (true) {
      const start = source.indexOf(marker, searchFrom);
      if (start === -1) break;
      let depth = 1;
      let i = start + marker.length;
      while (i < source.length && depth > 0) {
        if (source[i] === "(") depth++;
        else if (source[i] === ")") depth--;
        i++;
      }
      calls.push(source.slice(start, i));
      searchFrom = i;
    }
    return calls;
  }

  const files = roots.flatMap(collectFiles);
  expect(files.length).toBeGreaterThan(50); // sanity check the walk itself works

  it.each(files)("%s", (file) => {
    const source = readFileSync(file, "utf8");
    for (const call of extractCnCalls(source)) {
      const hasOutlineNone = /(?:^|[\s"'])outline-none(?:[\s"']|$)/.test(call);
      const hasFocusOutline = /focus-(?:visible|within):outline\b/.test(call);
      if (hasOutlineNone && hasFocusOutline) {
        throw new Error(
          `${file}: found "outline-none" together with a focus-visible/within:outline utility in the same cn(...) call — this silently disables the ring entirely (see file docstring). Snippet:\n${call.slice(0, 300)}`,
        );
      }
    }
  });
});
