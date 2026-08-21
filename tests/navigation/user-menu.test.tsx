import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { UserMenu } from "../../src/components/navigation/user-menu";

describe("UserMenu", () => {
  it("renders an initials trigger computed from the name", () => {
    render(<UserMenu name="Marta Ruiz" />);
    const trigger = screen.getByRole("button", { name: "Marta Ruiz" });
    expect(trigger).toHaveTextContent("MR");
  });

  it("single-word names produce a single initial", () => {
    render(<UserMenu name="Marta" />);
    expect(screen.getByRole("button", { name: "Marta" })).toHaveTextContent("M");
  });

  it("opens on click with the identity header and the items", async () => {
    const user = userEvent.setup();
    render(
      <UserMenu
        name="Marta Ruiz"
        email="marta@foundathyon.com"
        items={[{ label: "Preferences", icon: Settings }]}
        onSignOut={() => {}}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Marta Ruiz" }));
    const menu = await screen.findByRole("menu");
    expect(menu).toHaveTextContent("Marta Ruiz");
    expect(menu).toHaveTextContent("marta@foundathyon.com");
    expect(screen.getByRole("menuitem", { name: "Preferences" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toBeInTheDocument();
  });

  it("fires onSelect and closes after choosing an item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<UserMenu name="Marta Ruiz" items={[{ label: "Preferences", onSelect }]} />);
    await user.click(screen.getByRole("button", { name: "Marta Ruiz" }));
    await user.click(await screen.findByRole("menuitem", { name: "Preferences" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("styles destructive items with the danger tone, never accent (§18)", async () => {
    const user = userEvent.setup();
    render(<UserMenu name="Marta Ruiz" items={[{ label: "Delete workspace", destructive: true }]} />);
    await user.click(screen.getByRole("button", { name: "Marta Ruiz" }));
    const item = await screen.findByRole("menuitem", { name: "Delete workspace" });
    expect(item.className).toContain("text-danger");
  });

  it("uses the overridable sign-out label (Spanish copy)", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();
    render(<UserMenu name="Marta Ruiz" onSignOut={onSignOut} signOutLabel="Cerrar sesión" />);
    await user.click(screen.getByRole("button", { name: "Marta Ruiz" }));
    await user.click(await screen.findByRole("menuitem", { name: "Cerrar sesión" }));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
