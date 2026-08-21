import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SecurityEvent } from "../../src/components/security";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("SecurityEvent", () => {
  it("renders a system actor by name (icon, not a fake avatar) (§24)", () => {
    render(
      <SecurityEvent
        actor={{ system: true }}
        action="revoked the shared link of"
        target="production/api-keys"
        timestamp={new Date()}
      />,
    );
    expect(screen.getByText("system")).toBeInTheDocument();
    expect(screen.getByText("production/api-keys")).toBeInTheDocument();
  });

  it("copies a technical datum on click (§24)", async () => {
    render(
      <SecurityEvent
        actor={{ email: "rafa@gmail.com" }}
        action="changed the role"
        timestamp={new Date()}
        technical={{ ip: "85.61.204.12", traceId: "4a7f2e91", event: "accounts.role.update" }}
      />,
    );
    // the technical metadata is present, mono + muted
    expect(screen.getByText("85.61.204.12")).toBeInTheDocument();
    expect(screen.getByText("accounts.role.update")).toBeInTheDocument();

    // first copy button is the IP
    const copyButtons = screen.getAllByRole("button", { name: "Copy" });
    fireEvent.click(copyButtons[0]!);
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("85.61.204.12"));
  });
});
