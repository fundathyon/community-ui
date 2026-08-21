import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApiKeyItem } from "../../src/components/security";

const KEY = "fdn_ci_9f2b1234abcdKd41";

describe("ApiKeyItem", () => {
  it("computes an 'expiring' badge with the deadline when < 7 days out (§19)", () => {
    const inTwoDays = new Date(Date.now() + 2 * 86_400_000);
    render(<ApiKeyItem name="ci-deploy" maskedValue={KEY} expiresAt={inTwoDays} />);
    expect(document.querySelector('[data-status="expiring"]')).toBeInTheDocument();
    // the badge carries the concrete plazo, never a bare "Expiring"
    expect(screen.getByText(/expires/i)).toBeInTheDocument();
  });

  it("does NOT mark a key expiring more than 7 days out", () => {
    const inThirtyDays = new Date(Date.now() + 30 * 86_400_000);
    render(<ApiKeyItem name="ci-deploy" maskedValue={KEY} expiresAt={inThirtyDays} />);
    expect(document.querySelector('[data-status="expiring"]')).not.toBeInTheDocument();
  });

  it("marks a past expiry as expired (terminal)", () => {
    const yesterday = new Date(Date.now() - 86_400_000);
    render(<ApiKeyItem name="ci-deploy" maskedValue={KEY} expiresAt={yesterday} />);
    expect(document.querySelector('[data-status="expired"]')).toBeInTheDocument();
  });

  it("renders scope chips", () => {
    render(<ApiKeyItem name="ci-deploy" maskedValue={KEY} scopes={["registry:read", "registry:write"]} />);
    expect(screen.getByText("registry:read")).toBeInTheDocument();
    expect(screen.getByText("registry:write")).toBeInTheDocument();
  });
});
