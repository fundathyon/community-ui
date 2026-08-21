import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoleBadge, roleTone } from "../../src/components/security";

describe("roleTone", () => {
  it("tones roles by power", () => {
    expect(roleTone("owner")).toBe("warning");
    expect(roleTone("admin")).toBe("warning");
    expect(roleTone("developer")).toBe("info");
    expect(roleTone("member")).toBe("info");
    expect(roleTone("viewer")).toBe("neutral");
    expect(roleTone("readonly")).toBe("neutral");
  });

  it("defaults unknown roles to neutral rather than guessing", () => {
    expect(roleTone("wizard")).toBe("neutral");
  });
});

describe("RoleBadge", () => {
  it("renders the role name", () => {
    render(<RoleBadge role="admin" />);
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("honors a tone override", () => {
    render(<RoleBadge role="admin" tone="info" data-testid="role" />);
    expect(screen.getByTestId("role")).toHaveClass("text-info");
  });
});
