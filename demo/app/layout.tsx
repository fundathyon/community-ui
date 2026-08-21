import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@foundathyon/community-ui";
import { DemoProviders } from "../components/demo-providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foundathyon Community UI",
  description:
    "Showcase vivo del Design System v2 — un lenguaje, todas las herramientas: Vault, Dokgistry, Accounts, Cronify y Mocky.",
};

/** Restores the chosen demo product before first paint so the accent doesn't flash. */
const productScript = `(function(){try{var p=localStorage.getItem("fdn-demo-product");if(p){document.documentElement.setAttribute("data-fdn-product",p)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-fdn-product="vault"
      suppressHydrationWarning
      style={{ ["--fdn-font-sans" as string]: `${inter.style.fontFamily}, ui-sans-serif, system-ui, sans-serif` } as React.CSSProperties}
    >
      <head>
        <ThemeScript />
        <script dangerouslySetInnerHTML={{ __html: productScript }} />
      </head>
      <body>
        <DemoProviders>{children}</DemoProviders>
      </body>
    </html>
  );
}
