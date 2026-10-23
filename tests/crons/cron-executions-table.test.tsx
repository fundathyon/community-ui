import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CronExecutionsTable } from "../../src/components/crons/cron-executions-table";
import { ExecutionLogsDialog } from "../../src/components/crons/execution-logs-dialog";
import { ExecutionStatusBadge, executionStatusKey } from "../../src/components/crons/execution-status-badge";
import type { CronExecution } from "../../src/components/crons/types";

const executions: CronExecution[] = [
  { id: "e1", jobName: "Sync invoices", status: "success", trigger: "scheduled", createdAt: "2026-10-22T10:00:00Z", durationMs: 412 },
  { id: "e2", jobName: "Cleanup", status: "timeout", trigger: "manual", createdAt: "2026-10-22T09:00:00Z", durationMs: 30_000, errorMessage: "deadline exceeded" },
];

const fmt = (iso: string) => `at ${iso.slice(11, 16)}`;

describe("ExecutionStatusBadge", () => {
  it("maps Cronify states onto the suite taxonomy", () => {
    expect(executionStatusKey("success")).toBe("healthy");
    expect(executionStatusKey("timeout")).toBe("failed");
    expect(executionStatusKey("interrupted")).toBe("degraded");
    render(<ExecutionStatusBadge status="interrupted" labels={{ interrupted: "Interrumpida" }} />);
    expect(screen.getByText("Interrumpida")).toBeInTheDocument();
  });
});

describe("CronExecutionsTable", () => {
  it("draws status, trigger, start and duration", () => {
    render(<CronExecutionsTable executions={executions} formatDate={fmt} />);
    const rows = screen.getAllByRole("row");
    const first = rows[1]!;
    const second = rows[2]!;
    expect(within(first).getByText("Succeeded")).toBeInTheDocument();
    expect(within(first).getByText("Scheduled")).toBeInTheDocument();
    expect(within(first).getByText("at 10:00")).toBeInTheDocument();
    expect(within(first).getByText("412 ms")).toBeInTheDocument();
    expect(within(second).getByText("Timed out")).toBeInTheDocument();
    expect(within(second).getByText("30 s")).toBeInTheDocument();
  });

  it("opens an execution by keyboard-reachable button", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CronExecutionsTable executions={executions} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Cleanup" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(executions[1]);
  });

  it("tells empty from no results", () => {
    const { rerender } = render(<CronExecutionsTable executions={[]} />);
    expect(screen.getByText("No executions yet")).toBeInTheDocument();
    rerender(<CronExecutionsTable executions={[]} filtered />);
    expect(screen.getByText("No executions match these filters")).toBeInTheDocument();
  });
});

describe("ExecutionLogsDialog", () => {
  it("shows the header, error, loading and tinted output", () => {
    const { rerender } = render(
      <ExecutionLogsDialog execution={executions[1]!} logs={null} onOpenChange={() => {}} formatDate={fmt} />,
    );
    expect(screen.getByText("Loading output…")).toBeInTheDocument();
    expect(screen.getByText("deadline exceeded")).toBeInTheDocument();
    expect(screen.getByText(/Manual run · at 09:00 · 30 s/)).toBeInTheDocument();
    rerender(
      <ExecutionLogsDialog
        execution={executions[1]!}
        onOpenChange={() => {}}
        logs={[
          { id: "1", stream: "stderr", message: "Cloning into 'repo'..." },
          { id: "2", stream: "stdout", message: "error: boom" },
          { id: "3", stream: "system", message: "exit 1" },
        ]}
      />,
    );
    expect(screen.getByText("Cloning into 'repo'...").className).not.toContain("text-danger");
    expect(screen.getByText("error: boom")).toHaveClass("text-danger");
    expect(screen.getByText("exit 1")).toHaveClass("text-text-muted");
  });

  it("is closed without an execution and says when there is no output", () => {
    const { rerender } = render(<ExecutionLogsDialog execution={null} logs={[]} onOpenChange={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<ExecutionLogsDialog execution={executions[0]!} logs={[]} onOpenChange={() => {}} />);
    expect(screen.getByText("This execution left no output.")).toBeInTheDocument();
  });
});
