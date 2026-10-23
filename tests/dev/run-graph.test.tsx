import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RunGraph } from "../../src/components/dev/run-graph";
import { RunStatusBadge, runStatusKey, type RunJob } from "../../src/components/dev/run-status";

const jobs: RunJob[] = [
  { name: "test", stage: 0, status: "succeeded", startedAt: "2026-10-22T10:00:00Z", finishedAt: "2026-10-22T10:01:25Z" },
  { name: "lint", stage: 0, status: "failed", startedAt: "2026-10-22T10:00:00Z", finishedAt: "2026-10-22T10:00:09Z" },
  { name: "image", stage: 1, needs: ["test", "lint"], status: "running", startedAt: "2026-10-22T10:01:30Z" },
  { name: "deploy", stage: 2, needs: ["image"], status: "pending" },
];

describe("RunStatusBadge", () => {
  it("maps pipeline states onto the suite taxonomy", () => {
    expect(runStatusKey("succeeded")).toBe("healthy");
    expect(runStatusKey("running")).toBe("processing");
    expect(runStatusKey("timed_out")).toBe("failed");
    expect(runStatusKey("skipped")).toBe("disabled");
  });

  it("shows the default copy and takes translations", () => {
    const { rerender } = render(<RunStatusBadge status="timed_out" />);
    expect(screen.getByText("Timed out")).toBeInTheDocument();
    rerender(<RunStatusBadge status="timed_out" labels={{ timed_out: "Tiempo agotado" }} />);
    expect(screen.getByText("Tiempo agotado")).toBeInTheDocument();
  });
});

describe("RunGraph", () => {
  it("draws the file name, the trigger and one card per job", () => {
    render(<RunGraph jobs={jobs} file=".foundathyon/pipelines/release.yml" trigger="push · v1.4.2" />);
    expect(screen.getByText("release.yml")).toBeInTheDocument();
    expect(screen.getByText("push · v1.4.2")).toBeInTheDocument();
    for (const job of jobs) expect(screen.getByText(job.name)).toBeInTheDocument();
  });

  it("labels each status marker and shows finished durations only", () => {
    render(<RunGraph jobs={jobs} statusLabels={{ running: "Corriendo" }} />);
    expect(screen.getByRole("img", { name: "Succeeded" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Corriendo" })).toBeInTheDocument();
    expect(screen.getByText("1 m 25 s")).toBeInTheDocument();
    expect(screen.getAllByText("—")).toHaveLength(2);
  });

  it("cards are static without onSelect", () => {
    render(<RunGraph jobs={jobs} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("selects a job by click and marks it pressed", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<RunGraph jobs={jobs} selected="image" onSelect={onSelect} />);
    expect(screen.getByRole("button", { name: /image/ })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: /deploy/ }));
    expect(onSelect).toHaveBeenCalledWith("deploy");
  });

  it("uses a custom duration and renders nothing without jobs", () => {
    const { container, rerender } = render(<RunGraph jobs={jobs} durationLabel={(j) => `t:${j.name}`} />);
    expect(screen.getByText("t:image")).toBeInTheDocument();
    rerender(<RunGraph jobs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
