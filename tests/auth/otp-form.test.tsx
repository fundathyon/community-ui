import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OTPForm } from "../../src/components/auth";

afterEach(() => {
  vi.useRealTimers();
});

describe("OTPForm", () => {
  it("auto-submits the code when every digit is entered (§23)", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<OTPForm onSubmit={onSubmit} />);
    const inputs = screen.getAllByRole("textbox");
    await user.click(inputs[0]!);
    await user.keyboard("482159");
    expect(onSubmit).toHaveBeenCalledWith("482159");
  });

  it("disables resend and counts the cooldown down with fake timers (§23)", () => {
    vi.useFakeTimers();
    const onResend = vi.fn();
    render(<OTPForm onResend={onResend} cooldownSeconds={30} />);

    fireEvent.click(screen.getByRole("button", { name: "Resend code" }));
    expect(onResend).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Resend in 30s" })).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("button", { name: "Resend in 29s" })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(29000);
    });
    expect(screen.getByRole("button", { name: "Resend code" })).toBeEnabled();
  });

  it("renders a WARNING (not danger) lock with an explicit deadline and disables input (§23)", () => {
    render(<OTPForm locked={{ message: "Too many attempts. Try again in 15 minutes." }} />);
    expect(screen.getByText("Too many attempts. Try again in 15 minutes.")).toBeInTheDocument();
    // the warning Alert is polite, not assertive
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    for (const input of screen.getAllByRole("textbox")) {
      expect(input).toBeDisabled();
    }
  });
});
