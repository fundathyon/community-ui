import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/data-table/table";

describe("Table primitives", () => {
  it("renders the table structure with a11y roles", () => {
    render(
      <Table>
        <TableCaption>Repositories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead align="right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>nginx</TableCell>
            <TableCell align="right">142 MB</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(within(table).getAllByRole("columnheader")).toHaveLength(2);
    expect(within(table).getByRole("cell", { name: "nginx" })).toBeInTheDocument();
  });

  it("aligns right cells to the right", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right">142 MB</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("cell", { name: "142 MB" }).className).toContain("text-right");
  });

  it("marks a selected row with data-state and the accent wash", () => {
    render(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>nginx</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const row = screen.getByRole("row");
    expect(row).toHaveAttribute("data-state", "selected");
    expect(row.className).toContain("bg-accent-bg");
  });

  it("drops terminal rows to 0.6 opacity (§19)", () => {
    render(
      <Table>
        <TableBody>
          <TableRow terminal>
            <TableCell>legacy-worker</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("row").className).toContain("opacity-60");
  });

  it("opts into a sticky header via the group marker", () => {
    render(
      <Table stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(screen.getByRole("table")).toHaveAttribute("data-sticky");
    const header = screen.getByRole("rowgroup");
    expect(header.className).toContain("group-data-[sticky]:sticky");
  });
});
