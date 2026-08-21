import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataTable } from "../../src/components/data-table/data-table";
import type { DataTableColumn } from "../../src/components/data-table/types";
import { formatDate, formatNumber } from "../../src/lib/format";
import type { StatusKey } from "../../src/lib/status";

interface Row {
  id: string;
  name: string;
  count: number;
  size: number;
  dur: number;
  created: string;
  status: StatusKey;
  digest: string;
  tags: string[];
  active: boolean;
  note: string | null;
  level: "public" | "private" | "sensitive" | "secret";
}

const FULL_DIGEST = "sha256:4a3ed8abcdef9f21";

const ROWS: Row[] = [
  {
    id: "a",
    name: "alpha",
    count: 2481,
    size: 1048576, // 1 MB
    dur: 102000, // 1 m 42 s
    created: "2026-08-07",
    status: "active",
    digest: FULL_DIGEST,
    tags: ["a", "b", "c", "d", "e"],
    active: true,
    note: null,
    level: "secret",
  },
  {
    id: "b",
    name: "bravo",
    count: 10,
    size: 2048,
    dur: 14000,
    created: "2026-06-13",
    status: "revoked",
    digest: "sha256:deadbeefcafe0001",
    tags: ["x"],
    active: false,
    note: "hello",
    level: "public",
  },
];

const COLUMNS: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: (r) => r.name, type: "text", primary: true },
  { id: "count", header: "Count", accessor: (r) => r.count, type: "number" },
  { id: "size", header: "Size", accessor: (r) => r.size, type: "bytes" },
  { id: "dur", header: "Duration", accessor: (r) => r.dur, type: "duration" },
  { id: "created", header: "Created", accessor: (r) => r.created, type: "date" },
  { id: "status", header: "Status", accessor: (r) => r.status, type: "status" },
  { id: "digest", header: "Digest", accessor: (r) => r.digest, type: "digest" },
  { id: "tags", header: "Tags", accessor: (r) => r.tags, type: "tags" },
  { id: "active", header: "Verified", accessor: (r) => r.active, type: "boolean" },
  { id: "note", header: "Note", accessor: (r) => r.note, type: "text" },
  { id: "level", header: "Access", accessor: (r) => r.level, type: "sensitivity" },
];

function desktop() {
  return within(screen.getByRole("table"));
}

describe("DataTable cell catalog (§21)", () => {
  beforeEach(() => {
    render(<DataTable columns={COLUMNS} data={ROWS} rowId={(r) => r.id} />);
  });

  it("formats number, bytes, duration and date", () => {
    expect(desktop().getByText(formatNumber(2481))).toBeInTheDocument();
    expect(desktop().getByText("1 MB")).toBeInTheDocument();
    expect(desktop().getByText("1 m 42 s")).toBeInTheDocument();
    expect(desktop().getByText(formatDate("2026-08-07"))).toBeInTheDocument();
  });

  it("renders a StatusBadge for the status cell", () => {
    const badge = desktop().getByText("Active");
    expect(badge.closest("[data-status]")).toHaveAttribute("data-status", "active");
  });

  it("middle-truncates the digest and copies the FULL value", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    expect(desktop().getByText("sha256…9f21")).toBeInTheDocument();
    const button = desktop().getByRole("button", { name: `Copy: ${FULL_DIGEST}` });
    fireEvent.click(button);
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(FULL_DIGEST));
  });

  it("shows at most 3 tags plus a +n counter", () => {
    expect(desktop().getByText("+2")).toBeInTheDocument();
    expect(desktop().getByText("a")).toBeInTheDocument();
  });

  it("renders boolean as a check or a dash, never blank", () => {
    // true → labelled check icon
    expect(desktop().getByRole("img", { name: "Yes" })).toBeInTheDocument();
    // false and null both render the em dash
    expect(desktop().getAllByText("—").length).toBeGreaterThanOrEqual(2);
  });

  it("renders the sensitivity badge with overridable labels", () => {
    expect(desktop().getByText("Secret")).toBeInTheDocument();
    expect(desktop().getByText("Public")).toBeInTheDocument();
  });
});
