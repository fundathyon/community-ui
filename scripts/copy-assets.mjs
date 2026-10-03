// Copies non-TS build assets into dist/ after tsc + tailwind runs.
import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

mkdirSync(join(root, "dist/styles"), { recursive: true });
for (const f of ["tokens.css", "theme.css", "base.css"]) {
  copyFileSync(join(root, "src/styles", f), join(root, "dist/styles", f));
}
copyFileSync(join(root, "src/styles/tailwind-preset.cjs"), join(root, "dist/tailwind-preset.cjs"));
copyFileSync(join(root, "src/styles/tailwind-preset.d.cts"), join(root, "dist/tailwind-preset.d.cts"));

console.log("copy-assets: dist/styles + tailwind preset ready");
