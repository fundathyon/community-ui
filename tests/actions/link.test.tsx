import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "../../src/components/actions/link";

describe("Link", () => {
  it("renders an anchor with its accessible name", () => {
    render(<Link href="/docs">Documentación</Link>);
    const link = screen.getByRole("link", { name: "Documentación" });
    expect(link).toHaveAttribute("href", "/docs");
    // accent (default): no permanent underline — it appears on hover (§09)
    expect(link.className).toContain("hover:underline");
    expect(link.className).toContain("text-accent");
  });

  it("neutral variant keeps a permanent subtle underline for data contexts", () => {
    render(
      <Link href="/repo" variant="neutral">
        library/nginx
      </Link>,
    );
    const link = screen.getByRole("link", { name: "library/nginx" });
    expect(link.className).toContain("underline");
    expect(link.className).toContain("decoration-border-strong");
  });

  it("external adds target, rel and the 12px icon", () => {
    render(
      <Link href="https://example.com" external>
        Ir a los patterns
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Ir a los patterns" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
    expect(link.querySelector("svg")).not.toBeNull();
  });

  it("render substitution keeps classes, children and anchor attrs (router links)", () => {
    render(
      <Link href="/docs" external render={<a data-testid="router-link" data-prefetch="true" />}>
        Docs
      </Link>,
    );
    const link = screen.getByTestId("router-link");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("data-prefetch", "true");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveTextContent("Docs");
    expect(link.className).toContain("text-accent");
  });
});
