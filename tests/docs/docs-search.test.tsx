import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DocsSearch, type DocsSearchResult } from "../../src/docs/docs-search";

const results: DocsSearchResult[] = [
  { id: "install", title: "Installation", section: "Getting started", href: "/install" },
  { id: "auth", title: "Authentication", section: "Getting started", href: "/auth" },
];

describe("DocsSearch", () => {
  it("debounces onSearch, lists grouped results, and selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn().mockResolvedValue(results);
    const onSelect = vi.fn();

    render(<DocsSearch onSearch={onSearch} onSelect={onSelect} />);

    // open the dialog from the search-field-like trigger
    await user.click(screen.getByRole("button", { name: /Search/ }));
    const input = screen.getByRole("combobox");
    await user.type(input, "a");

    // debounced query reaches onSearch
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith("a"));

    // results are listed (grouped under their section)
    await screen.findByRole("option", { name: /Installation/ });
    expect(screen.getByRole("option", { name: /Authentication/ })).toBeInTheDocument();
    expect(screen.getByText("Getting started")).toBeInTheDocument();

    // ArrowDown moves from the first option to the second, Enter selects it
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "auth" }));
  });

  it("shows the empty state when the query has no results", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn().mockResolvedValue([]);

    render(<DocsSearch onSearch={onSearch} emptyMessage="Sin resultados" />);

    await user.click(screen.getByRole("button", { name: /Search/ }));
    await user.type(screen.getByRole("combobox"), "zzz");

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith("zzz"));
    expect(await screen.findByText("Sin resultados")).toBeInTheDocument();
  });
});
