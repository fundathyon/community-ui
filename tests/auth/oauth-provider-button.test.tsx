import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OAuthProviderButton } from "../../src/components/auth";

describe("OAuthProviderButton", () => {
  it("defaults the label to 'Continue with {Provider}' per provider", () => {
    const { rerender } = render(<OAuthProviderButton provider="google" />);
    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();

    rerender(<OAuthProviderButton provider="github" />);
    expect(screen.getByRole("button", { name: "Continue with GitHub" })).toBeInTheDocument();

    rerender(<OAuthProviderButton provider="gitlab" />);
    expect(screen.getByRole("button", { name: "Continue with GitLab" })).toBeInTheDocument();

    rerender(<OAuthProviderButton provider="sso" />);
    expect(screen.getByRole("button", { name: "Continue with SSO" })).toBeInTheDocument();

    // an unknown provider is capitalized
    rerender(<OAuthProviderButton provider="okta" />);
    expect(screen.getByRole("button", { name: "Continue with Okta" })).toBeInTheDocument();
  });

  it("accepts an explicit label override", () => {
    render(<OAuthProviderButton provider="google" label="Sign in with Google" />);
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  });

  it("fires onClick", () => {
    const onClick = vi.fn();
    render(<OAuthProviderButton provider="google" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
