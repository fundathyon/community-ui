import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  SignInPreview,
  signInAccentColor,
  signInAccentOnColor,
  type SignInPreviewStrategies,
} from "../../src/components/auth/sign-in-preview";

const all: SignInPreviewStrategies = { password: true, emailCode: true, magicLink: true, oauth: ["google", "github"] };
const branding = { name: "Acme", accent: "neutral" as const };

describe("SignInPreview", () => {
  it("is decorative: hidden from assistive tech, no inputs or buttons", () => {
    const { container } = render(<SignInPreview branding={branding} strategies={all} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("input, button")).toBeNull();
  });

  it("draws password sign-in with every alternative and OAuth provider", () => {
    render(<SignInPreview branding={branding} strategies={all} />);
    expect(screen.getByText("Sign in to Acme")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Use an email code")).toBeInTheDocument();
    expect(screen.getByText("Email me a sign-in link")).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByText("Continue with Github")).toBeInTheDocument();
    expect(screen.getByText("Secured by Foundathyon Accounts")).toBeInTheDocument();
  });

  it("switches to the passwordless screen with only an email code", () => {
    render(
      <SignInPreview branding={branding} strategies={{ password: false, emailCode: true, magicLink: false, oauth: [] }} />,
    );
    expect(screen.getByText("We will email you a code")).toBeInTheDocument();
    expect(screen.getByText("Send code")).toBeInTheDocument();
    expect(screen.queryByText("Password")).toBeNull();
  });

  it("says sign-in is unavailable when nothing is enabled", () => {
    render(
      <SignInPreview
        branding={{ name: "", accent: "neutral" }}
        strategies={{ password: false, emailCode: false, magicLink: false, oauth: [] }}
        hideBranding
      />,
    );
    expect(screen.getByText("Sign-in is not available right now.")).toBeInTheDocument();
    expect(screen.queryByText("Secured by Foundathyon Accounts")).toBeNull();
  });

  it("takes translated labels with {app} and {provider}", () => {
    render(
      <SignInPreview
        branding={branding}
        strategies={{ password: true, emailCode: false, magicLink: false, oauth: ["google"] }}
        labels={{ title: "Inicia sesión en {app}", continueWith: "Continuar con {provider}" }}
      />,
    );
    expect(screen.getByText("Inicia sesión en Acme")).toBeInTheDocument();
    expect(screen.getByText("Continuar con Google")).toBeInTheDocument();
  });

  it("draws only https logos, or http on localhost", () => {
    const { container, rerender } = render(
      <SignInPreview branding={{ ...branding, logoUrl: "http://evil.example/logo.png" }} strategies={all} />,
    );
    expect(container.querySelector("img")).toBeNull();
    rerender(<SignInPreview branding={{ ...branding, logoUrl: "https://acme.test/logo.png" }} strategies={all} />);
    expect(container.querySelector("img")).toHaveAttribute("src", "https://acme.test/logo.png");
    rerender(<SignInPreview branding={{ ...branding, logoUrl: "http://localhost:3000/l.png" }} strategies={all} />);
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("resolves the accent like the web component", () => {
    expect(signInAccentColor("neutral", "light")).toBe("oklch(0.21 0 0)");
    expect(signInAccentColor({ hue: 45, l: 0.56, c: 0.17 }, "dark")).toBe("oklch(0.56 0.17 45)");
    expect(signInAccentOnColor({ hue: 90, l: 0.8, c: 0.1 }, "light")).toBe("oklch(0.21 0 0)");
  });
});
