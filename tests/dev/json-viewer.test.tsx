import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { JsonViewer } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("JsonViewer", () => {
  it("shows a field count on collapsed objects", () => {
    render(<JsonViewer data={{ user: { name: "Ada", role: "admin" } }} />);
    expect(screen.getByText(/2 fields/)).toBeInTheDocument();
    expect(screen.queryByText('"name"')).not.toBeInTheDocument();
  });

  it("shows an item count on collapsed arrays", () => {
    render(<JsonViewer data={{ users: [1, 2, 3] }} />);
    expect(screen.getByText(/3 items/)).toBeInTheDocument();
  });

  it("expands a collapsed node and shows its children", () => {
    render(<JsonViewer data={{ user: { name: "Ada", role: "admin" } }} />);
    const toggle = screen.getByRole("button", { name: /"user"/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText('"name"')).toBeInTheDocument();
    expect(screen.getByText('"Ada"')).toBeInTheDocument();
  });

  it("renders strings as success and primitives as accent", () => {
    render(<JsonViewer data={{ email: "rafa@gmail.com", logins: 42, verified: true }} />);
    expect(screen.getByText('"rafa@gmail.com"').className).toContain("text-success");
    expect(screen.getByText("42").className).toContain("text-accent");
    expect(screen.getByText("true").className).toContain("text-accent");
    expect(screen.getByText('"email"').className).toContain("text-info");
  });

  it("masks values of secretKeys (case-insensitive) with a badge marker", () => {
    render(
      <JsonViewer data={{ token: "supersecret123456789", plain: "visible" }} secretKeys={["TOKEN"]} />,
    );
    expect(screen.queryByText(/"supersecret123456789"/)).not.toBeInTheDocument();
    expect(screen.getByText(/••••/)).toBeInTheDocument();
    expect(screen.getByText("Secret")).toBeInTheDocument();
    expect(screen.getByText('"visible"')).toBeInTheDocument();
  });

  it("copies the raw JSON when no secretKeys are given", async () => {
    const data = { user: { name: "Ada" } };
    render(<JsonViewer data={data} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(JSON.stringify(data, null, 2)));
  });

  it("masks secrets in the copied JSON too — secrets never travel in clear", async () => {
    render(
      <JsonViewer data={{ token: "supersecret123456789", plain: "visible" }} secretKeys={["token"]} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0]?.[0] as string;
    expect(copied).toContain("••••");
    expect(copied).not.toContain("supersecret123456789");
    expect(copied).toContain('"visible"');
  });

  it("supports overridable count and secret labels", () => {
    render(
      <JsonViewer
        data={{ user: { name: "Ada" }, token: "abcdef0123456789" }}
        secretKeys={["token"]}
        secretLabel="Secreto"
        countLabel={(n) => `${n} campos`}
      />,
    );
    expect(screen.getByText(/1 campos/)).toBeInTheDocument();
    expect(screen.getByText("Secreto")).toBeInTheDocument();
  });
});
