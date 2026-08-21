import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton, SkeletonGroup } from "../../src/components/feedback/skeleton";

describe("Skeleton", () => {
  it("SkeletonGroup announces the busy region (aria-busy + polite live region)", () => {
    render(
      <SkeletonGroup label="Cargando repositorios" data-testid="group">
        <Skeleton variant="text" lines={3} />
      </SkeletonGroup>,
    );
    const group = screen.getByTestId("group");
    expect(group).toHaveAttribute("aria-busy", "true");
    expect(group).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Cargando repositorios")).toHaveClass("sr-only");
  });

  it("busy=false clears aria-busy so the load is announced once", () => {
    render(<SkeletonGroup busy={false} data-testid="group" />);
    expect(screen.getByTestId("group")).not.toHaveAttribute("aria-busy");
  });

  it("bones are decorative (aria-hidden) and pulse via fdn-skeleton", () => {
    render(
      <SkeletonGroup data-testid="group">
        <Skeleton variant="rect" className="h-8 w-full" data-testid="bone" />
      </SkeletonGroup>,
    );
    const bone = screen.getByTestId("bone");
    expect(bone).toHaveAttribute("aria-hidden", "true");
    expect(bone.className).toContain("fdn-skeleton");
  });

  it("text variant renders the requested lines with a shortened last line", () => {
    render(<Skeleton variant="text" lines={3} data-testid="text" />);
    const wrapper = screen.getByTestId("text");
    expect(wrapper.children).toHaveLength(3);
    expect(wrapper.children[2]!.className).toContain("w-3/5");
  });

  it("circle variant is round", () => {
    render(<Skeleton variant="circle" className="size-8" data-testid="circle" />);
    expect(screen.getByTestId("circle").className).toContain("rounded-full");
  });
});
