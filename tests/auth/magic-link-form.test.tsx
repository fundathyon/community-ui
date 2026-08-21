import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MagicLinkForm } from "../../src/components/auth";

describe("MagicLinkForm", () => {
  it("submits the email before it's sent", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<MagicLinkForm onSubmit={onSubmit} />);
    await user.type(container.querySelector('input[name="email"]')!, "rafa@example.com");
    await user.click(screen.getByRole("button", { name: "Email me a link" }));
    expect(onSubmit).toHaveBeenCalledWith({ email: "rafa@example.com" });
  });

  it("shows the sent confirmation (with resend) instead of the form", () => {
    const onResend = vi.fn();
    render(<MagicLinkForm sent onResend={onResend} />);
    expect(screen.getByText("Check your email")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Email me a link" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Resend link" }));
    expect(onResend).toHaveBeenCalledTimes(1);
  });
});
