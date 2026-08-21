import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DocsSection } from "../../src/docs/docs-section";

describe("DocsSection", () => {
  it("renders an anchored heading with a link to its id", () => {
    render(
      <DocsSection id="authentication" heading="Authentication">
        body
      </DocsSection>,
    );
    const heading = screen.getByRole("heading", { level: 2, name: /Authentication/ });
    expect(heading).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Authentication" })).toHaveAttribute("href", "#authentication");
    // the section carries the anchor id
    expect(document.getElementById("authentication")).toBeInTheDocument();
  });

  it("copies the section link to the clipboard (fireEvent + mocked clipboard)", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <DocsSection id="errors" heading="Errors">
        body
      </DocsSection>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy link to section" }));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("#errors"));
  });

  it("renders a level-3 sub-section heading", () => {
    render(
      <DocsSection id="sub" heading="Sub-section" level={3}>
        x
      </DocsSection>,
    );
    expect(screen.getByRole("heading", { level: 3, name: /Sub-section/ })).toBeInTheDocument();
  });
});
