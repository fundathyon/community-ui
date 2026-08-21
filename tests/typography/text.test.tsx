import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd } from "../../src/components/typography/kbd";
import { Text } from "../../src/components/typography/text";

describe("Text", () => {
  it("body defaults to a <p> with text-body and default tone", () => {
    render(<Text>Invita miembros y asigna roles.</Text>);
    const el = screen.getByText("Invita miembros y asigna roles.");
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("text-body");
    expect(el.className).toContain("text-text");
  });

  it("non-body variants default to <span>", () => {
    render(<Text variant="caption">Único dentro de su nivel</Text>);
    expect(screen.getByText("Único dentro de su nivel").tagName).toBe("SPAN");
  });

  it("applies each variant's type-scale class", () => {
    const variants = [
      ["body-sm", "text-body-sm"],
      ["label", "text-label"],
      ["caption", "text-caption"],
      ["overline", "text-overline"],
      ["code", "text-code"],
    ] as const;
    render(
      <>
        {variants.map(([variant]) => (
          <Text key={variant} variant={variant}>
            {`sample-${variant}`}
          </Text>
        ))}
      </>,
    );
    for (const [variant, className] of variants) {
      expect(screen.getByText(`sample-${variant}`).className).toContain(className);
    }
  });

  it("code renders mono — literal and copyable (§03)", () => {
    render(<Text variant="code">sha256:4a3ed8</Text>);
    expect(screen.getByText("sha256:4a3ed8").className).toContain("font-mono");
  });

  it("overline renders uppercase", () => {
    render(<Text variant="overline">Resource</Text>);
    expect(screen.getByText("Resource").className).toContain("uppercase");
  });

  it("maps tones to text color roles", () => {
    render(
      <>
        <Text tone="secondary">secondary-copy</Text>
        <Text tone="muted">muted-copy</Text>
        <Text tone="disabled">disabled-copy</Text>
      </>,
    );
    expect(screen.getByText("secondary-copy").className).toContain("text-text-secondary");
    expect(screen.getByText("muted-copy").className).toContain("text-text-muted");
    expect(screen.getByText("disabled-copy").className).toContain("text-text-disabled");
  });

  it("renders as the requested element", () => {
    render(
      <dl>
        <Text as="dt" variant="label">
          Estado
        </Text>
        <Text as="dd">Activo</Text>
      </dl>,
    );
    expect(screen.getByText("Estado").tagName).toBe("DT");
    expect(screen.getByText("Activo").tagName).toBe("DD");
  });

  it("tabular applies tabular-nums — data numbers are always tabular (§03)", () => {
    render(<Text tabular>128</Text>);
    expect(screen.getByText("128").className).toContain("tabular-nums");
  });
});

describe("Kbd", () => {
  it("renders a <kbd> chip in mono", () => {
    render(<Kbd>⌘K</Kbd>);
    const kbd = screen.getByText("⌘K");
    expect(kbd.tagName).toBe("KBD");
    expect(kbd.className).toContain("font-mono");
    expect(kbd.className).toContain("border-border");
  });
});
