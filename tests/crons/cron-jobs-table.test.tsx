import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CronJobsTable } from "../../src/components/crons/cron-jobs-table";
import type { CronJob } from "../../src/components/crons/types";

const jobs: CronJob[] = [
  { id: "1", name: "Sync invoices", enabled: true, type: "http", schedule: "*/5 * * * *", http: { method: "POST", url: "https://api.acme.test/sync" } },
  { id: "2", name: "Cleanup", description: "Old sessions", enabled: false, type: "shell", schedule: "7 4 * * 2" },
];

describe("CronJobsTable", () => {
  it("draws each job with schedule, target and status", () => {
    render(<CronJobsTable jobs={jobs} />);
    const rows = screen.getAllByRole("row");
    const first = rows[1]!;
    const second = rows[2]!;
    expect(within(first).getByText("Every 5 minutes")).toBeInTheDocument();
    expect(within(first).getByText("*/5 * * * *")).toBeInTheDocument();
    expect(within(first).getByText("POST")).toBeInTheDocument();
    expect(within(first).getByText("https://api.acme.test/sync")).toBeInTheDocument();
    expect(within(first).getByText("On")).toBeInTheDocument();
    expect(within(second).getByText("7 4 * * 2")).toBeInTheDocument();
    expect(within(second).getByText("shell")).toBeInTheDocument();
    expect(within(second).getByText("Off")).toBeInTheDocument();
    expect(screen.queryByRole("columnheader", { name: "Actions" })).toBeNull();
  });

  it("toggles and runs jobs through callbacks", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onRun = vi.fn();
    render(<CronJobsTable jobs={jobs} onToggle={onToggle} onRun={onRun} />);
    await user.click(screen.getByRole("switch", { name: "Enable Cleanup" }));
    expect(onToggle).toHaveBeenCalledWith(jobs[1], true);
    await user.click(screen.getAllByRole("button", { name: "Run now" })[0]!);
    expect(onRun).toHaveBeenCalledWith(jobs[0]);
  });

  it("disables the busy job's switch", () => {
    render(<CronJobsTable jobs={jobs} onToggle={() => {}} busyId="1" />);
    expect(screen.getByRole("switch", { name: "Enable Sync invoices" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("switch", { name: "Enable Cleanup" })).not.toHaveAttribute("aria-disabled", "true");
  });

  it("shows loading, empty with its action, and error states", () => {
    const { rerender } = render(<CronJobsTable jobs={[]} state="loading" />);
    expect(document.querySelector("[aria-busy=true]")).not.toBeNull();
    rerender(<CronJobsTable jobs={[]} emptyAction={<button type="button">New job</button>} />);
    expect(screen.getByText("No jobs yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New job" })).toBeInTheDocument();
    rerender(<CronJobsTable jobs={jobs} state="error" />);
    expect(screen.getByText("Jobs could not be loaded")).toBeInTheDocument();
  });

  it("takes translated copy and presets", () => {
    render(
      <CronJobsTable
        jobs={jobs}
        labels={{ name: "Nombre", on: "Activo", presets: [{ value: "*/5 * * * *", label: "Cada 5 minutos" }] }}
      />,
    );
    expect(screen.getByRole("columnheader", { name: "Nombre" })).toBeInTheDocument();
    expect(screen.getByText("Cada 5 minutos")).toBeInTheDocument();
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });
});
