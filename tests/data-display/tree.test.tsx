import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tree, type TreeNode } from "../../src/components/data-display/tree";

const items: TreeNode[] = [
  {
    id: "production",
    label: "production",
    children: [
      {
        id: "api-keys",
        label: "api-keys",
        children: [{ id: "app-config", label: "app-config.yaml" }],
      },
      { id: "database", label: "database.env" },
    ],
  },
];

function treeItemFor(label: string): HTMLElement {
  return screen.getByText(label).closest('[role="treeitem"]') as HTMLElement;
}

describe("Tree", () => {
  it("exposes the ARIA tree structure", () => {
    render(<Tree items={items} aria-label="Vault" />);
    expect(screen.getByRole("tree", { name: "Vault" })).toBeInTheDocument();
    const root = treeItemFor("production");
    expect(root).toHaveAttribute("aria-expanded", "false");
  });

  it("expands a folder with ArrowRight and reveals a group", async () => {
    const user = userEvent.setup();
    render(<Tree items={items} />);
    const root = treeItemFor("production");
    root.focus();
    expect(root).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{ArrowRight}");
    expect(treeItemFor("production")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("api-keys")).toBeInTheDocument();
  });

  it("navigates between visible items with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tree items={items} />);
    const root = treeItemFor("production");
    root.focus();
    await user.keyboard("{ArrowRight}"); // expand
    await user.keyboard("{ArrowDown}"); // move to first child
    expect(treeItemFor("api-keys")).toHaveFocus();
    await user.keyboard("{ArrowLeft}"); // collapse api-keys? it is collapsed already → go to parent
    expect(treeItemFor("production")).toHaveFocus();
  });

  it("collapses an expanded folder with ArrowLeft", async () => {
    const user = userEvent.setup();
    render(<Tree items={items} />);
    const root = treeItemFor("production");
    root.focus();
    await user.keyboard("{ArrowRight}");
    expect(treeItemFor("production")).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowLeft}");
    expect(treeItemFor("production")).toHaveAttribute("aria-expanded", "false");
  });

  it("selects a node on click and reports it", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Tree items={items} onSelect={onSelect} />);
    // expand to reach a leaf
    treeItemFor("production").focus();
    await user.keyboard("{ArrowRight}");
    await user.click(screen.getByText("database.env"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ label: "database.env" }),
      "database",
    );
    expect(treeItemFor("database.env")).toHaveAttribute("aria-selected", "true");
  });
});
