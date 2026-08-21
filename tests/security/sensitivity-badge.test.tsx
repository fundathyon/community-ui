import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { isSensitivityLevel, SensitivityBadge, sensitivityTone } from "../../src/components/security";

describe("sensitivityTone", () => {
  it("tones the four §20 levels by exposure", () => {
    expect(sensitivityTone("public")).toBe("neutral");
    expect(sensitivityTone("private")).toBe("info");
    expect(sensitivityTone("sensitive")).toBe("warning");
    expect(sensitivityTone("secret")).toBe("danger");
  });
});

describe("isSensitivityLevel", () => {
  it("accepts the four valid levels", () => {
    expect(isSensitivityLevel("public")).toBe(true);
    expect(isSensitivityLevel("private")).toBe(true);
    expect(isSensitivityLevel("sensitive")).toBe(true);
    expect(isSensitivityLevel("secret")).toBe(true);
  });

  it("rejects anything outside the set rather than guessing", () => {
    expect(isSensitivityLevel("top-secret")).toBe(false);
    expect(isSensitivityLevel(undefined)).toBe(false);
    expect(isSensitivityLevel(42)).toBe(false);
  });
});

describe("SensitivityBadge", () => {
  it("renders the default English label for a level", () => {
    render(<SensitivityBadge level="secret" />);
    expect(screen.getByText("Secret")).toBeInTheDocument();
  });

  it("tones the badge from the level by default", () => {
    render(<SensitivityBadge level="secret" data-testid="sensitivity" />);
    expect(screen.getByTestId("sensitivity")).toHaveClass("text-danger");
  });

  it("honors a tone override", () => {
    render(<SensitivityBadge level="public" tone="danger" data-testid="sensitivity" />);
    expect(screen.getByTestId("sensitivity")).toHaveClass("text-danger");
  });

  it("allows overriding the displayed text", () => {
    render(<SensitivityBadge level="secret">Muy secreto</SensitivityBadge>);
    expect(screen.getByText("Muy secreto")).toBeInTheDocument();
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });

  it("has no icon by default, so dense contexts like table cells stay compact", () => {
    render(<SensitivityBadge level="secret" data-testid="sensitivity" />);
    expect(screen.getByTestId("sensitivity").querySelector("svg")).not.toBeInTheDocument();
  });

  it("shows the level's icon when showIcon is set (§M-01: color never alone)", () => {
    render(<SensitivityBadge level="secret" showIcon data-testid="sensitivity" />);
    expect(screen.getByTestId("sensitivity").querySelector("svg")).toBeInTheDocument();
  });
});
