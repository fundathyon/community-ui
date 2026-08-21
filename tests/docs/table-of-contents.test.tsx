import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TableOfContents, type TocItem } from "../../src/docs/table-of-contents";

const items: TocItem[] = [
  { id: "intro", label: "Intro", depth: 2 },
  { id: "auth", label: "Authentication", depth: 3 },
  { id: "errors", label: "Errors", depth: 2 },
];

describe("TableOfContents", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("links each entry to its anchor and marks the controlled active one", () => {
    render(<TableOfContents items={items} activeId="auth" />);

    const auth = screen.getByRole("link", { name: "Authentication" });
    expect(auth).toHaveAttribute("href", "#auth");
    expect(auth).toHaveAttribute("aria-current", "true");

    const intro = screen.getByRole("link", { name: "Intro" });
    expect(intro).toHaveAttribute("href", "#intro");
    expect(intro).not.toHaveAttribute("aria-current");
  });

  it("labels the rail and renders the heading", () => {
    render(<TableOfContents items={items} label="En esta página" />);
    expect(screen.getByRole("navigation", { name: "En esta página" })).toBeInTheDocument();
    expect(screen.getByText("En esta página")).toBeInTheDocument();
  });

  it("scroll-spies with IntersectionObserver when followScroll", () => {
    let capturedCallback: IntersectionObserverCallback | undefined;
    class IOStub {
      constructor(cb: IntersectionObserverCallback) {
        capturedCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    vi.stubGlobal("IntersectionObserver", IOStub);

    render(<TableOfContents items={items} followScroll />);

    // Simulate "errors" becoming the visible section.
    act(() => {
      capturedCallback?.(
        [{ target: { id: "errors" } as Element, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByRole("link", { name: "Errors" })).toHaveAttribute("aria-current", "true");
  });
});
