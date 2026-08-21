import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination, renderRange } from "../../src/components/navigation/pagination";

describe("Pagination", () => {
  it("renders labelled page buttons with aria-current on the current page", () => {
    render(<Pagination page={2} pageCount={4} onPageChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    const current = screen.getByRole("button", { name: "Page 2" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 3" })).not.toHaveAttribute("aria-current");
  });

  it("fires onPageChange from numbers and prev/next", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={4} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables prev on the first page and next on the last", () => {
    const { rerender } = render(<Pagination page={1} pageCount={7} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
    rerender(<Pagination page={7} pageCount={7} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("collapses gaps with ellipsis (first + siblings + last)", () => {
    render(<Pagination page={5} pageCount={10} onPageChange={() => {}} />);
    // 1 … 4 5 6 … 10
    for (const page of [1, 4, 5, 6, 10]) {
      expect(screen.getByRole("button", { name: `Page ${page}` })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "Page 2" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 9" })).not.toBeInTheDocument();
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("shows a single ellipsis near an edge and none when everything fits", () => {
    const { rerender } = render(<Pagination page={1} pageCount={7} onPageChange={() => {}} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
    rerender(<Pagination page={2} pageCount={20} onPageChange={() => {}} />);
    expect(screen.getAllByText("…")).toHaveLength(1);
  });

  it("compact mode renders prev/next plus a status text", () => {
    render(<Pagination compact page={3} pageCount={7} onPageChange={() => {}} />);
    expect(screen.getByText("3 of 7")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Page 3" })).not.toBeInTheDocument();
  });

  it("shows the range label slot", () => {
    render(
      <Pagination page={3} pageCount={7} onPageChange={() => {}} rangeLabel={renderRange(3, 20, 128)} />,
    );
    expect(screen.getByText("41–60 of 128")).toBeInTheDocument();
  });
});

describe("renderRange", () => {
  it("computes the visible window", () => {
    expect(renderRange(3, 20, 128)).toBe("41–60 of 128");
    expect(renderRange(1, 20, 128)).toBe("1–20 of 128");
  });

  it("clamps the last page and handles empty totals", () => {
    expect(renderRange(7, 20, 128)).toBe("121–128 of 128");
    expect(renderRange(1, 20, 0)).toBe("0–0 of 0");
  });
});
