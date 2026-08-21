import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DiffViewer } from "../../src/components/dev";

describe("DiffViewer", () => {
  it("computes added and removed lines from before/after", () => {
    render(<DiffViewer before={"replicas: 2\ntimeout: 30s"} after={"replicas: 4\ntimeout: 30s"} />);
    expect(screen.getByText("replicas: 2").closest("[data-diff]")).toHaveAttribute("data-diff", "removed");
    expect(screen.getByText("replicas: 4").closest("[data-diff]")).toHaveAttribute("data-diff", "added");
    expect(screen.getByText("timeout: 30s").closest("[data-diff]")).toHaveAttribute("data-diff", "context");
    expect(screen.getByText("−")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("parses a unified diff", () => {
    const diff = [
      "--- a/config.yaml",
      "+++ b/config.yaml",
      "@@ -1,2 +1,2 @@",
      "-replicas: 2",
      "+replicas: 4",
      " timeout: 30s",
    ].join("\n");
    render(<DiffViewer diff={diff} />);
    expect(screen.getByText("@@ -1,2 +1,2 @@").closest("[data-diff]")).toHaveAttribute("data-diff", "hunk");
    expect(screen.getByText("replicas: 2").closest("[data-diff]")).toHaveAttribute("data-diff", "removed");
    expect(screen.getByText("replicas: 4").closest("[data-diff]")).toHaveAttribute("data-diff", "added");
    expect(screen.getByText("timeout: 30s").closest("[data-diff]")).toHaveAttribute("data-diff", "context");
    // the +++/--- file headers never render as content
    expect(screen.queryByText(/a\/config\.yaml/)).not.toBeInTheDocument();
  });

  it("renders the filename · vFrom → vTo header", () => {
    render(<DiffViewer before="a" after="b" filename="config.yaml" versionFrom="v12" versionTo="v13" />);
    expect(screen.getByText("config.yaml")).toBeInTheDocument();
    expect(screen.getByText(/v12 → v13/)).toBeInTheDocument();
  });

  it("shows old/new line numbers when lineNumbers is set", () => {
    const { container } = render(
      <DiffViewer before={"same\nold"} after={"same\nnew"} lineNumbers />,
    );
    const removed = container.querySelector('[data-diff="removed"]');
    expect(removed?.textContent).toContain("2");
    expect(screen.getByText("same").closest("[data-diff]")?.textContent).toContain("1");
  });

  it("announces added/removed lines to screen readers", () => {
    render(<DiffViewer before={"old"} after={"new"} />);
    expect(screen.getByText("Removed:", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Added:", { exact: false })).toBeInTheDocument();
  });
});
