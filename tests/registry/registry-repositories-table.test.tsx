import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  RegistryRepositoriesTable,
  type RegistryRepository,
} from "../../src/components/registry/registry-repositories-table";

const repos: RegistryRepository[] = [
  { name: "acme/api", images: 12, sizeBytes: 1_288_490_189, lastPushedAt: "2026-10-22T10:00:00Z", lastPushedBy: "ci" },
  { name: "acme/worker" },
];

describe("RegistryRepositoriesTable", () => {
  it("draws name, images, size and last push", () => {
    render(<RegistryRepositoriesTable repositories={repos} formatDate={(iso) => iso.slice(0, 10)} />);
    const rows = screen.getAllByRole("row");
    const first = rows[1]!;
    const second = rows[2]!;
    expect(within(first).getByText("acme/api")).toBeInTheDocument();
    expect(within(first).getByText("12")).toBeInTheDocument();
    expect(within(first).getByText("1.2 GB")).toBeInTheDocument();
    expect(within(first).getByText("2026-10-22 · ci")).toBeInTheDocument();
    expect(within(second).getByText("0")).toBeInTheDocument();
    expect(within(second).getAllByText("—")).toHaveLength(2);
  });

  it("links names only with getHref, through renderLink when given", () => {
    const { rerender } = render(<RegistryRepositoriesTable repositories={repos} />);
    expect(screen.queryByRole("link")).toBeNull();
    rerender(<RegistryRepositoriesTable repositories={repos} getHref={(r) => `/registry/${r.name}`} />);
    expect(screen.getByRole("link", { name: "acme/api" })).toHaveAttribute("href", "/registry/acme/api");
    rerender(
      <RegistryRepositoriesTable
        repositories={repos}
        getHref={(r) => `/registry/${r.name}`}
        renderLink={({ href, className, children }) => (
          <a href={href} className={className} data-router="next">
            {children}
          </a>
        )}
      />,
    );
    expect(screen.getByRole("link", { name: "acme/worker" })).toHaveAttribute("data-router", "next");
  });

  it("shows loading, empty with its exit, and error", () => {
    const { rerender } = render(<RegistryRepositoriesTable repositories={[]} state="loading" />);
    expect(document.querySelector("[aria-busy=true]")).not.toBeNull();
    rerender(<RegistryRepositoriesTable repositories={[]} emptyAction={<button type="button">Copy push command</button>} />);
    expect(screen.getByText("No images yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy push command" })).toBeInTheDocument();
    rerender(<RegistryRepositoriesTable repositories={repos} state="error" />);
    expect(screen.getByText("Repositories could not be loaded")).toBeInTheDocument();
  });

  it("takes translated copy", () => {
    render(<RegistryRepositoriesTable repositories={repos} labels={{ repository: "Repositorio", lastPush: "Último push" }} />);
    expect(screen.getByRole("columnheader", { name: "Repositorio" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Último push" })).toBeInTheDocument();
  });
});
