import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "../../src/components/auth";

describe("LoginForm", () => {
  it("submits the entered email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<LoginForm onSubmit={onSubmit} />);
    await user.type(container.querySelector('input[name="email"]')!, "rafa@example.com");
    await user.type(container.querySelector('input[name="password"]')!, "hunter2");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).toHaveBeenCalledWith({ email: "rafa@example.com", password: "hunter2", remember: false });
  });

  it("shows the credential error as an Alert above the fields (§16)", () => {
    const { container } = render(<LoginForm error="Incorrect email or password" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Incorrect email or password");
    // the error appears BEFORE the first field in the DOM
    const email = container.querySelector('input[name="email"]')!;
    expect(alert.compareDocumentPosition(email) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("wires the correct autocomplete/autocapitalize attributes", () => {
    const { container } = render(<LoginForm />);
    const email = container.querySelector('input[name="email"]')!;
    expect(email).toHaveAttribute("autocomplete", "email");
    expect(email).toHaveAttribute("autocapitalize", "none");
    expect(container.querySelector('input[name="password"]')).toHaveAttribute("autocomplete", "current-password");
  });

  it("renders the forgot-password slot inline with the password label", () => {
    render(<LoginForm forgotPasswordSlot={<a href="/reset">Forgot?</a>} />);
    expect(screen.getByRole("link", { name: "Forgot?" })).toBeInTheDocument();
  });

  it("includes the remember choice when enabled", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<LoginForm onSubmit={onSubmit} showRemember />);
    await user.type(container.querySelector('input[name="email"]')!, "a@b.co");
    await user.type(container.querySelector('input[name="password"]')!, "pw");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.co", password: "pw", remember: true });
  });
});
