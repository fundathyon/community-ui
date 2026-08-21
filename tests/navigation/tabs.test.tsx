import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tab, Tabs, TabsList, TabsPanel } from "../../src/components/navigation/tabs";

function ExampleTabs(props: { onValueChange?: (value: unknown) => void }) {
  return (
    <Tabs defaultValue="overview" onValueChange={props.onValueChange}>
      <TabsList>
        <Tab value="overview">Overview</Tab>
        <Tab value="tags" count={12}>
          Tags
        </Tab>
        <Tab value="settings">Settings</Tab>
      </TabsList>
      <TabsPanel value="overview">Panel overview</TabsPanel>
      <TabsPanel value="tags">Panel tags</TabsPanel>
      <TabsPanel value="settings">Panel settings</TabsPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders a tablist with selected state and its associated panel", () => {
    render(<ExampleTabs />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const overview = screen.getByRole("tab", { name: "Overview" });
    expect(overview).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("Panel overview");
    // tab ↔ panel wiring
    expect(overview.getAttribute("aria-controls")).toBe(panel.id);
  });

  it("moves and activates with arrow keys (§12 keyboard)", async () => {
    const user = userEvent.setup();
    render(<ExampleTabs />);
    await user.click(screen.getByRole("tab", { name: "Overview" }));
    await user.keyboard("{ArrowRight}");
    const tags = screen.getByRole("tab", { name: /Tags/ });
    expect(tags).toHaveFocus();
    expect(tags).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel tags");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  });

  it("selects on click and reports value changes for URL sync", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ExampleTabs onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Settings" }));
    expect(onValueChange).toHaveBeenCalledWith("settings", expect.anything());
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel settings");
  });

  it("renders the optional count badge inside the tab", () => {
    render(<ExampleTabs />);
    expect(screen.getByRole("tab", { name: /Tags/ })).toHaveTextContent("12");
  });
});
