import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UptimeBars, type UptimeDay } from "../../src/components/data-display/uptime-bars";

const days: UptimeDay[] = [
  { day: "2026-10-20", status: "nodata", uptime: null },
  { day: "2026-10-21", status: "down", uptime: 97.5, down: 36 },
  { day: "2026-10-22", status: "up", uptime: 100, down: 0 },
];

describe("UptimeBars", () => {
  it("draws one bar per day under an accessible summary", () => {
    render(<UptimeBars days={days} label="99.2% uptime over 3 days" />);
    const strip = screen.getByRole("img", { name: "99.2% uptime over 3 days" });
    expect(strip.children).toHaveLength(3);
  });

  it("colours each bar by status and titles it with the day summary", () => {
    render(<UptimeBars days={days} label="strip" />);
    const [nodata, down, up] = Array.from(screen.getByRole("img").children);
    expect(nodata).toHaveClass("bg-border");
    expect(nodata).toHaveAttribute("title", "Oct 20, 2026 · no data");
    expect(down).toHaveClass("bg-danger-solid");
    expect(down).toHaveAttribute("title", "Oct 21, 2026 · 97.5% uptime · 36 failed checks");
    expect(up).toHaveClass("bg-success-solid");
    expect(up).toHaveAttribute("title", "Oct 22, 2026 · 100% uptime");
  });

  it("hides the oldest bars on mobile beyond mobileDays", () => {
    render(<UptimeBars days={days} label="strip" mobileDays={2} />);
    const bars = Array.from(screen.getByRole("img").children);
    expect(bars[0]).toHaveClass("hidden", "sm:block");
    expect(bars[1]).not.toHaveClass("hidden");
  });

  it("takes translated captions and tooltips", () => {
    render(
      <UptimeBars
        days={days}
        label="tira"
        todayLabel="Hoy"
        daysAgoLabel={(n) => `Hace ${n} días`}
        dayTitle={(d) => `día ${d.day}`}
      />,
    );
    expect(screen.getByText("Hoy")).toBeInTheDocument();
    expect(screen.getAllByText("Hace 3 días")).not.toHaveLength(0);
    expect(screen.getByRole("img").children[2]).toHaveAttribute("title", "día 2026-10-22");
  });
});
