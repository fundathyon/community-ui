import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "../../src/components/typography/heading";

describe("Heading", () => {
  it("renders the heading element and matching type-scale class per level", () => {
    render(
      <>
        <Heading level={1}>Repositorios</Heading>
        <Heading level={2}>Miembros</Heading>
        <Heading level={3}>Tokens</Heading>
        <Heading level={4}>Registry</Heading>
        <Heading level={5}>Sincronizaciones</Heading>
      </>,
    );
    for (const level of [1, 2, 3, 4, 5] as const) {
      const heading = screen.getByRole("heading", { level });
      expect(heading.tagName).toBe(`H${level}`);
      expect(heading.className).toContain(`text-h${level}`);
    }
  });

  it("decouples visual size from semantic level", () => {
    render(
      <Heading level={2} visual="h4">
        Configuración
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.tagName).toBe("H2");
    expect(heading.className).toContain("text-h4");
    expect(heading.className).not.toContain("text-h2");
  });

  it("supports the display visual", () => {
    render(
      <Heading level={1} visual="display">
        Tu infraestructura
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 1 }).className).toContain("text-display");
  });

  it("merges className", () => {
    render(
      <Heading level={3} className="text-text-secondary">
        Título
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 3 }).className).toContain("text-text-secondary");
  });
});
