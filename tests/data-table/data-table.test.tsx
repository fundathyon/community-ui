import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "../../src/components/data-table/data-table";
import type { DataTableColumn } from "../../src/components/data-table/types";

interface Repo {
  id: string;
  name: string;
  count: number;
  status: "active" | "syncing" | "revoked";
}

const ROWS: Repo[] = [
  { id: "r1", name: "alpha", count: 30, status: "active" },
  { id: "r2", name: "bravo", count: 10, status: "syncing" },
  { id: "r3", name: "charlie", count: 20, status: "revoked" },
];

const COLUMNS: DataTableColumn<Repo>[] = [
  { id: "name", header: "Name", accessor: (r) => r.name, type: "text", primary: true, sortable: true },
  { id: "count", header: "Count", accessor: (r) => r.count, type: "number", sortable: true },
  { id: "status", header: "Status", accessor: (r) => r.status, type: "status" },
];

function desktop() {
  // Both a desktop <table> and a mobile card list render (CSS-gated); jsdom
  // applies no CSS so both are present — scope queries to the semantic table.
  return within(screen.getByRole("table"));
}

describe("DataTable", () => {
  it("renders one header plus a row per datum", () => {
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} />);
    const rows = desktop().getAllByRole("row");
    expect(rows).toHaveLength(1 + ROWS.length);
    expect(desktop().getByRole("cell", { name: "alpha" })).toBeInTheDocument();
    expect(desktop().getByText("30")).toBeInTheDocument();
  });

  it("cycles aria-sort asc → desc → none on a sortable header", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} />);
    const header = desktop().getByRole("columnheader", { name: /Count/ });
    expect(header).toHaveAttribute("aria-sort", "none");
    const button = within(header).getByRole("button");
    await user.click(button);
    expect(desktop().getByRole("columnheader", { name: /Count/ })).toHaveAttribute("aria-sort", "ascending");
    await user.click(within(desktop().getByRole("columnheader", { name: /Count/ })).getByRole("button"));
    expect(desktop().getByRole("columnheader", { name: /Count/ })).toHaveAttribute("aria-sort", "descending");
    await user.click(within(desktop().getByRole("columnheader", { name: /Count/ })).getByRole("button"));
    expect(desktop().getByRole("columnheader", { name: /Count/ })).toHaveAttribute("aria-sort", "none");
  });

  it("sorts rows ascending by the sorted column", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} />);
    await user.click(within(desktop().getByRole("columnheader", { name: /Count/ })).getByRole("button"));
    const bodyRows = desktop().getAllByRole("row").slice(1);
    const firstCells = bodyRows.map((row) => within(row).getAllByRole("cell")[0]?.textContent);
    // ascending by count → bravo(10), charlie(20), alpha(30)
    expect(firstCells).toEqual(["bravo", "charlie", "alpha"]);
  });

  it("filters via the controlled globalFilter", () => {
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} globalFilter="bravo" />);
    const bodyRows = desktop().getAllByRole("row").slice(1);
    expect(bodyRows).toHaveLength(1);
    expect(desktop().getByRole("cell", { name: "bravo" })).toBeInTheDocument();
  });

  it("searches inside structured cell values (user, tags) via globalFilter", () => {
    const columns: DataTableColumn<Repo>[] = [
      { id: "owner", header: "Owner", type: "user", accessor: (r) => ({ id: `usr_${r.id}`, name: `Owner of ${r.name}` }), primary: true },
      { id: "tags", header: "Tags", type: "tags", accessor: (r) => [r.status, "community"] },
    ];
    const { rerender } = render(<DataTable columns={columns} data={ROWS} rowId={(r) => r.id} globalFilter="usr_r2" />);
    expect(desktop().getAllByRole("row").slice(1)).toHaveLength(1);
    expect(desktop().getByText("Owner of bravo")).toBeInTheDocument();

    rerender(<DataTable columns={columns} data={ROWS} rowId={(r) => r.id} globalFilter="revoked" />);
    expect(desktop().getAllByRole("row").slice(1)).toHaveLength(1);
    expect(desktop().getByText("Owner of charlie")).toBeInTheDocument();
  });

  it("distinguishes the empty state from the no-results state", () => {
    const { container, rerender } = render(
      <DataTable columns={COLUMNS} data={[]} rowId={(r) => r.id} emptyState={{ title: "Nothing here" }} />,
    );
    expect(container.querySelector('[data-kind="empty"]')).toBeInTheDocument();
    expect(screen.getByText("Nothing here")).toBeInTheDocument();

    rerender(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        globalFilter="zzz"
        noResultsState={{ title: "No matches found" }}
      />,
    );
    expect(container.querySelector('[data-kind="no-results"]')).toBeInTheDocument();
    expect(screen.getByText("No matches found")).toBeInTheDocument();
  });

  it("renders the error state and fires retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <DataTable
        columns={COLUMNS}
        data={[]}
        rowId={(r) => r.id}
        error={{ title: "Could not load", retry: { label: "Retry", onClick: onRetry } }}
      />,
    );
    expect(screen.getByText("Could not load")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders skeleton rows mirroring the column count while loading", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={[]}
        rowId={(r) => r.id}
        loading
        loadingRowCount={4}
        enableSelection
        rowActions={() => []}
      />,
    );
    const skeletonRows = screen.getAllByTestId("skeleton-row");
    expect(skeletonRows).toHaveLength(4);
    // 1 selection + 3 columns + 1 actions = 5 cells per row
    const firstRow = skeletonRows[0]!;
    expect(within(firstRow).getAllByRole("cell")).toHaveLength(5);
  });

  it("paginates: slices rows and shows the footer summary", async () => {
    const user = userEvent.setup();
    const five: Repo[] = [
      { id: "1", name: "one", count: 1, status: "active" },
      { id: "2", name: "two", count: 2, status: "active" },
      { id: "3", name: "three", count: 3, status: "active" },
      { id: "4", name: "four", count: 4, status: "active" },
      { id: "5", name: "five", count: 5, status: "active" },
    ];
    render(<DataTable columns={COLUMNS} data={five} rowId={(r) => r.id} pagination={{ pageSize: 2 }} />);
    expect(desktop().getAllByRole("row").slice(1)).toHaveLength(2);
    expect(screen.getByText("2 of 5")).toBeInTheDocument();
    expect(desktop().getByRole("cell", { name: "one" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(desktop().getByRole("cell", { name: "three" })).toBeInTheDocument();
    expect(desktop().queryByRole("cell", { name: "one" })).not.toBeInTheDocument();
  });

  it("selection: row checkbox, header tri-state, bulk toolbar and clear", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        enableSelection
        bulkActions={(rows) => <button type="button">Delete {rows.length}</button>}
      />,
    );
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument();

    const checkboxes = desktop().getAllByRole("checkbox");
    // [0] header, [1..] rows
    await user.click(checkboxes[1]!);
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete 1" })).toBeInTheDocument();
    expect(desktop().getAllByRole("checkbox")[0]).toHaveAttribute("aria-checked", "mixed");

    await user.click(desktop().getAllByRole("checkbox")[0]!);
    expect(screen.getByText("3 selected")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument();
  });

  it("opens the row actions menu and fires the action", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        rowActions={() => [{ label: "Edit", onSelect: onEdit }]}
      />,
    );
    const trigger = desktop().getAllByRole("button", { name: "Actions" })[0]!;
    await user.click(trigger);
    const item = await screen.findByRole("menuitem", { name: "Edit" });
    await user.click(item);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("toggles aria-expanded and reveals the expanded row", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        expandable={{ render: (r) => <div>Detail {r.name}</div> }}
      />,
    );
    const expandButtons = desktop().getAllByRole("button", { name: "Expand row" });
    expect(expandButtons[0]).toHaveAttribute("aria-expanded", "false");
    await user.click(expandButtons[0]!);
    expect(desktop().getByRole("button", { name: "Collapse row" })).toHaveAttribute("aria-expanded", "true");
    expect(desktop().getByText("Detail alpha")).toBeInTheDocument();
  });

  it("applies the hideBelow priority class to a column", () => {
    const columns: DataTableColumn<Repo>[] = [
      ...COLUMNS,
      { id: "count2", header: "Extra", accessor: (r) => r.count, type: "number", hideBelow: "lg" },
    ];
    render(<DataTable columns={columns} data={ROWS} rowId={(r) => r.id} />);
    const header = desktop().getByRole("columnheader", { name: "Extra" });
    expect(header.className).toContain("lg:table-cell");
  });

  it("drops terminal rows to 0.6 opacity via getRowProps", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        getRowProps={(row) => ({ terminal: row.status === "revoked" })}
      />,
    );
    const bodyRows = desktop().getAllByRole("row").slice(1);
    const revoked = bodyRows.find((row) => within(row).queryByText("charlie"));
    expect(revoked?.className).toContain("opacity-60");
  });

  it("fires onRowClick when a row is clicked", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} onRowClick={onRowClick} />);
    await user.click(desktop().getByRole("cell", { name: "alpha" }));
    expect(onRowClick).toHaveBeenCalledWith(ROWS[0]);
  });
});

describe("DataTable frame (§14)", () => {
  it("renders the toolbar inside the frame and swaps its trailing side for the selection summary", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        enableSelection
        toolbar={<input aria-label="Filter" />}
        toolbarEnd={<button type="button">View</button>}
        bulkActions={() => <button type="button">Delete selection</button>}
        labels={{ selectedCount: (n) => `${n} seleccionada${n === 1 ? "" : "s"}` }}
      />,
    );
    const frame = container.querySelector('[data-slot="data-table"]')!;
    const toolbar = frame.querySelector('[data-slot="toolbar"]')!;
    expect(within(toolbar as HTMLElement).getByLabelText("Filter")).toBeInTheDocument();
    expect(within(toolbar as HTMLElement).getByRole("button", { name: "View" })).toBeInTheDocument();
    expect(frame.querySelector('[data-slot="footer"]')).toBeInTheDocument();

    await user.click(desktop().getAllByRole("checkbox")[1]!);
    expect(within(toolbar as HTMLElement).getByText("1 seleccionada")).toBeInTheDocument();
    expect(within(toolbar as HTMLElement).getByRole("button", { name: "Delete selection" })).toBeInTheDocument();
    expect(within(toolbar as HTMLElement).queryByRole("button", { name: "View" })).not.toBeInTheDocument();
    // The search never leaves the bar while rows are selected.
    expect(within(toolbar as HTMLElement).getByLabelText("Filter")).toBeInTheDocument();
  });

  it("keeps the toolbar visible in the empty, no-results, error and loading states", () => {
    const { container, rerender } = render(
      <DataTable columns={COLUMNS} data={[]} rowId={(r) => r.id} toolbar={<input aria-label="Filter" />} />,
    );
    expect(container.querySelector('[data-kind="empty"]')).toBeInTheDocument();
    expect(screen.getByLabelText("Filter")).toBeInTheDocument();

    rerender(
      <DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} globalFilter="zzz" toolbar={<input aria-label="Filter" />} />,
    );
    expect(container.querySelector('[data-kind="no-results"]')).toBeInTheDocument();
    expect(screen.getByLabelText("Filter")).toBeInTheDocument();

    rerender(
      <DataTable columns={COLUMNS} data={[]} rowId={(r) => r.id} error={{ title: "Boom" }} toolbar={<input aria-label="Filter" />} />,
    );
    expect(screen.getByText("Boom")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter")).toBeInTheDocument();

    rerender(
      <DataTable columns={COLUMNS} data={[]} rowId={(r) => r.id} loading toolbar={<input aria-label="Filter" />} />,
    );
    expect(screen.getAllByTestId("skeleton-row").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Filter")).toBeInTheDocument();
  });

  it("renders the summary and the caption in the footer", () => {
    const { container } = render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        footer="Fila terminal a 0.6 de opacidad"
        labels={{ of: (shown, total) => `${shown} de ${total} imágenes` }}
      />,
    );
    const footer = container.querySelector('[data-slot="footer"]') as HTMLElement;
    expect(within(footer).getByText("3 de 3 imágenes")).toBeInTheDocument();
    expect(within(footer).getByText("Fila terminal a 0.6 de opacidad")).toBeInTheDocument();
  });

  it("groups rows under group rows in first-appearance order", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={ROWS}
        rowId={(r) => r.id}
        groupBy={{ key: (r) => (r.status === "revoked" ? "Terminal" : "Live") }}
      />,
    );
    const rows = desktop().getAllByRole("row").slice(1);
    const texts = rows.map((row) => row.textContent);
    // Live → alpha, bravo · Terminal → charlie
    expect(texts[0]).toContain("Live");
    expect(texts[0]).toContain("2");
    expect(texts[1]).toContain("alpha");
    expect(texts[2]).toContain("bravo");
    expect(texts[3]).toContain("Terminal");
    expect(texts[4]).toContain("charlie");
  });

  it("uses overline caps for column headers and a chevron for the sorted one", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} />);
    const header = desktop().getByRole("columnheader", { name: /Name/ });
    expect(header.className).toContain("uppercase");
    await user.click(within(header).getByRole("button"));
    expect(desktop().getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "ascending");
  });
});
