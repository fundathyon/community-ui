import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SignupForm } from "../../src/components/auth";

describe("SignupForm", () => {
  it("renders the terms slot and gates submission on accepting it", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(
      <SignupForm onSubmit={onSubmit} termsSlot={<span>I agree to the terms</span>} />,
    );
    expect(screen.getByText("I agree to the terms")).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: "Create account" });
    expect(submit).toBeDisabled();

    await user.type(container.querySelector('input[name="email"]')!, "rafa@example.com");
    await user.type(container.querySelector('input[name="password"]')!, "supersecret12");
    await user.click(screen.getByRole("checkbox"));

    expect(submit).toBeEnabled();
    await user.click(submit);
    expect(onSubmit).toHaveBeenCalledWith({ email: "rafa@example.com", password: "supersecret12" });
  });

  it("uses new-password autocomplete", () => {
    const { container } = render(<SignupForm />);
    expect(container.querySelector('input[name="password"]')).toHaveAttribute("autocomplete", "new-password");
  });
});
