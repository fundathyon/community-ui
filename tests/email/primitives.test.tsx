/**
 * Email primitives: bulletproof button, code block, tone alerts, key-value
 * rows, header/footer slots, preheader. String assertions on the rendered
 * HTML — email output has no DOM to query.
 */
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import {
  EmailAlert,
  EmailButton,
  EmailCode,
  EmailFooter,
  EmailHeader,
  EmailKeyValue,
  EmailLayout,
  emailThemes,
  renderEmail,
  type EmailTheme,
} from "../../src/email";
import { palette } from "../../src/email/palette";

const theme: EmailTheme = { ...emailThemes.vault, productName: "Vault" };

function render(
  children: ReactNode,
  layout?: Partial<{ preheader: string; footer: ReactNode; header: ReactNode }>,
) {
  return renderEmail(
    <EmailLayout theme={theme} {...layout}>
      {children}
    </EmailLayout>,
  );
}

describe("EmailButton", () => {
  it("renders a table-wrapped anchor with the accent background", () => {
    const html = render(<EmailButton href="https://vault.test/go">Open vault</EmailButton>);
    expect(html).toContain('href="https://vault.test/go"');
    expect(html).toContain(`background-color:${theme.accent}`);
    expect(html).toContain("Open vault");
    // bulletproof: the anchor lives inside a padded td, no <button> anywhere
    expect(html).not.toContain("<button");
    expect(html).toContain("padding:11px 24px");
  });

  it("secondary variant uses surface fill with accent border and text", () => {
    const html = render(
      <EmailButton href="https://vault.test/go" variant="secondary">
        View details
      </EmailButton>,
    );
    expect(html).toContain(`border:1px solid ${theme.accent}`);
    expect(html).toContain(`background-color:${palette.surface}`);
    expect(html).toContain(`color:${theme.accent}`);
  });

  it("honors accentContrast for the primary label", () => {
    const html = renderEmail(
      <EmailLayout theme={{ ...theme, accentContrast: "#111111" }}>
        <EmailButton href="https://vault.test/go">Open vault</EmailButton>
      </EmailLayout>,
    );
    expect(html).toContain("color:#111111");
  });
});

describe("EmailCode", () => {
  it("renders the code large, mono and letter-spaced in a bordered box", () => {
    const html = render(<EmailCode code="482 193" expiresText="Expires in 10 minutes." />);
    expect(html).toContain("482 193");
    expect(html).toContain("letter-spacing:6px");
    expect(html).toContain("font-size:28px");
    expect(html).toContain(`background-color:${palette.bgSubtle}`);
    expect(html).toContain("Expires in 10 minutes.");
  });
});

describe("EmailAlert", () => {
  it.each([
    ["info", palette.info],
    ["success", palette.success],
    ["warning", palette.warning],
    ["danger", palette.danger],
  ] as const)("renders the %s tetrad: tinted bg + 3px left bar", (tone, colors) => {
    const html = render(
      <EmailAlert tone={tone} title="Title line">
        Body line
      </EmailAlert>,
    );
    expect(html).toContain(`background-color:${colors.bg}`);
    expect(html).toContain(`border-left:3px solid ${colors.text}`);
    expect(html).toContain("Title line");
    expect(html).toContain("Body line");
  });
});

describe("EmailKeyValue", () => {
  it("renders label/value rows with mono values", () => {
    const html = render(
      <EmailKeyValue
        items={[
          { label: "Device", value: "Firefox · Linux" },
          { label: "IP", value: "203.0.113.44" },
        ]}
      />,
    );
    expect(html).toContain("Device");
    expect(html).toContain("Firefox · Linux");
    expect(html).toContain("203.0.113.44");
    expect(html).toContain("ui-monospace");
  });

  it("renders nothing for an empty list", () => {
    const withItems = render(<EmailKeyValue items={[]} />);
    const without = render(null);
    expect(withItems).toBe(without);
  });
});

describe("EmailHeader / EmailFooter / EmailLayout", () => {
  it("falls back to the product name in the accent when there is no logo", () => {
    const html = render(null);
    expect(html).toContain("Vault");
    expect(html).toContain(`color:${theme.accent}`);
    expect(html).not.toContain("<img");
  });

  it("uses the logo with productName alt when logoUrl is set", () => {
    const html = renderEmail(
      <EmailLayout theme={{ ...theme, logoUrl: "https://cdn.test/vault.png" }} />,
    );
    expect(html).toContain('src="https://cdn.test/vault.png"');
    expect(html).toContain('alt="Vault"');
  });

  it("renders header meta and footer overrides through the slots", () => {
    const html = render(null, {
      header: <EmailHeader meta="Security" />,
      footer: (
        <EmailFooter
          links={[{ label: "Docs", href: "https://vault.test/docs" }]}
          address="Foundathyon SL"
          unsubscribe={<a href="https://vault.test/unsub">Unsubscribe</a>}
        />
      ),
    });
    expect(html).toContain("Security");
    expect(html).toContain('href="https://vault.test/docs"');
    expect(html).toContain("Foundathyon SL");
    expect(html).toContain('href="https://vault.test/unsub"');
  });

  it("hides the preheader text but keeps it in the markup", () => {
    const html = render(null, { preheader: "Preview snippet here" });
    expect(html).toContain("Preview snippet here");
    expect(html).toContain("display:none");
  });

  it("paints the light canvas and the surface card", () => {
    const html = render(null);
    expect(html).toContain(`background-color:${palette.bg}`);
    expect(html).toContain(`background-color:${palette.surface}`);
    expect(html).toContain(`1px solid ${palette.border}`);
  });
});
