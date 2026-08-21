import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SessionItem, SessionList } from "../../src/components/security";

describe("SessionList / SessionItem", () => {
  it("never renders a revoke action for the current session (§23)", () => {
    render(
      <SessionList>
        <SessionItem
          device="MacBook Pro · Chrome 128"
          current
          ip="85.61.204.12"
          location="Madrid, ES"
          lastActive={new Date()}
          deviceType="desktop"
          onRevoke={() => {}}
        />
      </SessionList>,
    );
    expect(screen.queryByRole("button", { name: "Revoke" })).not.toBeInTheDocument();
    expect(screen.getByText("This session")).toBeInTheDocument();
  });

  it("fires revoke for a non-current session", () => {
    const onRevoke = vi.fn();
    render(
      <SessionItem
        device="iPhone · Safari"
        ip="92.184.99.7"
        location="Lisboa, PT"
        lastActive={new Date(Date.now() - 3 * 86_400_000)}
        deviceType="mobile"
        onRevoke={onRevoke}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Revoke" }));
    expect(onRevoke).toHaveBeenCalledTimes(1);
  });

  it("shows IP and location as verifiable (mono) data", () => {
    render(<SessionItem device="Box" ip="10.0.0.1" location="Madrid, ES" lastActive={new Date()} />);
    expect(screen.getByText("10.0.0.1")).toHaveClass("font-mono");
    expect(screen.getByText("Madrid, ES")).toHaveClass("font-mono");
  });
});
