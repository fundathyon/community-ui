import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Package, Tags } from "lucide-react";
import { describe, expect, it } from "vitest";
import {
  Sidebar,
  SidebarItem,
  SidebarProvider,
  SidebarSection,
  SidebarTrigger,
} from "../../src/components/navigation/sidebar";

function Shell({ defaultCollapsed = false, withTrigger = true }: { defaultCollapsed?: boolean; withTrigger?: boolean }) {
  return (
    <SidebarProvider defaultCollapsed={defaultCollapsed} storageKey={null}>
      {withTrigger && <SidebarTrigger />}
      <Sidebar data-testid="sidebar">
        <SidebarSection label="Registry">
          <SidebarItem icon={Package} label="Repositorios" href="/repos" current />
          <SidebarItem icon={Tags} label="Tags" href="/tags" count={3} />
        </SidebarSection>
      </Sidebar>
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  it("marks the current item with aria-current and the accent wash (§12)", () => {
    render(<Shell />);
    const current = screen.getByRole("link", { name: "Repositorios" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.className).toContain("bg-accent-bg");
    expect(screen.getByRole("link", { name: /Tags/ })).not.toHaveAttribute("aria-current");
  });

  it("renders the counter badge next to its item", () => {
    render(<Shell />);
    expect(screen.getByRole("link", { name: /Tags/ })).toHaveTextContent("3");
  });

  it("collapses via the trigger, exposing aria-expanded and the collapsed width", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    const trigger = screen.getByRole("button", { name: "Toggle sidebar" });
    const sidebar = screen.getByTestId("sidebar");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(sidebar.className).toContain("w-sidebar");
    expect(sidebar).not.toHaveAttribute("data-collapsed");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(sidebar).toHaveAttribute("data-collapsed");
    expect(sidebar.className).toContain("w-sidebar-collapsed");

    await user.click(trigger);
    expect(sidebar).not.toHaveAttribute("data-collapsed");
  });

  it("toggles with the suite-wide ⌘B shortcut (§17)", async () => {
    const user = userEvent.setup();
    render(<Shell withTrigger={false} />);
    const sidebar = screen.getByTestId("sidebar");
    await user.keyboard("{Meta>}b{/Meta}");
    expect(sidebar).toHaveAttribute("data-collapsed");
    await user.keyboard("{Control>}b{/Control}");
    expect(sidebar).not.toHaveAttribute("data-collapsed");
  });

  it("collapsed: keeps the label for screen readers, hides the counter", () => {
    render(<Shell defaultCollapsed withTrigger={false} />);
    const item = screen.getByRole("link", { name: "Repositorios" });
    const label = screen.getByText("Repositorios");
    expect(label.className).toContain("sr-only");
    expect(item).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Tags/ })).not.toHaveTextContent("3");
  });

  it("collapsed: shows the label in a tooltip on keyboard focus (§12)", async () => {
    const user = userEvent.setup();
    render(<Shell defaultCollapsed withTrigger={false} />);
    await user.tab();
    expect(screen.getByRole("link", { name: "Repositorios" })).toHaveFocus();
    // sr-only label + tooltip popup
    const labels = await screen.findAllByText("Repositorios");
    expect(labels.length).toBeGreaterThan(1);
  });

  it("disabled item: not a link, explains itself in a tooltip (§12)", async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider storageKey={null}>
        <Sidebar>
          <SidebarItem icon={Tags} label="Políticas" disabled reason="Requiere el plan Team" />
        </Sidebar>
      </SidebarProvider>,
    );
    const item = screen.getByText("Políticas").closest("a");
    expect(item).not.toHaveAttribute("href");
    expect(item).toHaveAttribute("aria-disabled", "true");
    await user.tab();
    expect(item).toHaveFocus();
    expect(await screen.findByText("Requiere el plan Team")).toBeInTheDocument();
  });

  it("substitutes the anchor via the render prop for router links", () => {
    render(
      <SidebarProvider storageKey={null}>
        <Sidebar>
          <SidebarItem
            icon={Package}
            label="Repositorios"
            current
            render={(props) => <a data-router-link {...props} href="/spa/repos" />}
          />
        </Sidebar>
      </SidebarProvider>,
    );
    const link = screen.getByRole("link", { name: "Repositorios" });
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("href", "/spa/repos");
    expect(link).toHaveAttribute("aria-current", "page");
  });
});
