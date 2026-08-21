import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PermissionMatrix } from "../../src/components/security";

const permissions = [
  { id: "read", label: "View resources" },
  { id: "delete", label: "Delete" },
];
const roles = [
  { id: "owner", label: "Owner" },
  { id: "dev", label: "Dev" },
];
// read: everyone; delete: owner only
const granted = (permissionId: string, roleId: string) => permissionId === "read" || roleId === "owner";

describe("PermissionMatrix", () => {
  it("announces each cell as allowed / not allowed (§23)", () => {
    render(<PermissionMatrix permissions={permissions} roles={roles} granted={granted} />);
    expect(screen.getByRole("cell", { name: "View resources · Owner: allowed" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "View resources · Dev: allowed" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Delete · Owner: allowed" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Delete · Dev: not allowed" })).toBeInTheDocument();
  });

  it("renders a check for granted and a dash for denied — no background color", () => {
    const { container } = render(<PermissionMatrix permissions={permissions} roles={roles} granted={granted} />);
    // exactly one denied cell → one dash
    expect(screen.getByText("—")).toBeInTheDocument();
    // three granted cells → three check icons
    expect(container.querySelectorAll("svg")).toHaveLength(3);
  });

  it("supports overridable announcement copy", () => {
    render(
      <PermissionMatrix
        permissions={permissions}
        roles={roles}
        granted={granted}
        labels={{ allowed: "permitido", notAllowed: "no permitido" }}
      />,
    );
    expect(screen.getByRole("cell", { name: "Delete · Dev: no permitido" })).toBeInTheDocument();
  });
});
