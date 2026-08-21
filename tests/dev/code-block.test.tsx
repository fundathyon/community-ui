import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeBlock, CommandBlock } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("CodeBlock", () => {
  it("renders the code content", () => {
    render(<CodeBlock code="hello world" />);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("accepts the code as children", () => {
    render(<CodeBlock>{"pnpm install"}</CodeBlock>);
    expect(screen.getByText("pnpm install")).toBeInTheDocument();
  });

  it("copies the source to the clipboard", async () => {
    render(<CodeBlock code="docker pull nginx" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("docker pull nginx"));
  });

  it("switches content when a tab is clicked", () => {
    render(
      <CodeBlock
        tabs={[
          { label: "curl", code: "first snippet" },
          { label: "node", code: "second snippet" },
        ]}
      />,
    );
    expect(screen.getByText("first snippet")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "curl" })).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("tab", { name: "node" }));
    expect(screen.getByText("second snippet")).toBeInTheDocument();
    expect(screen.queryByText("first snippet")).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "node" })).toHaveAttribute("aria-selected", "true");
  });

  it("moves between tabs with the arrow keys", () => {
    render(
      <CodeBlock
        tabs={[
          { label: "curl", code: "first snippet" },
          { label: "node", code: "second snippet" },
        ]}
      />,
    );
    fireEvent.keyDown(screen.getByRole("tab", { name: "curl" }), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "node" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("second snippet")).toBeInTheDocument();
  });

  it("supports a controlled activeTab", () => {
    const onActiveTabChange = vi.fn();
    render(
      <CodeBlock
        activeTab={0}
        onActiveTabChange={onActiveTabChange}
        tabs={[
          { label: "curl", code: "first snippet" },
          { label: "node", code: "second snippet" },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "node" }));
    expect(onActiveTabChange).toHaveBeenCalledWith(1);
    // controlled: the parent did not update, so the content must not change
    expect(screen.getByText("first snippet")).toBeInTheDocument();
  });

  it("copies the active tab's code", async () => {
    render(
      <CodeBlock
        tabs={[
          { label: "curl", code: "first snippet" },
          { label: "node", code: "second snippet" },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "node" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("second snippet"));
  });

  it("command variant renders the prompt but copy excludes it", async () => {
    render(<CodeBlock variant="command" language="bash" code="docker pull nginx" />);
    expect(screen.getAllByText("$").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("docker pull nginx"));
  });

  it("collapses past maxLines behind a Show more toggle", () => {
    render(<CodeBlock code={"l1\nl2\nl3\nl4"} maxLines={2} />);
    expect(screen.getByText("l1")).toBeInTheDocument();
    expect(screen.queryByText("l3")).not.toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Show more" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(screen.getByText("l3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute("aria-expanded", "true");
  });

  it("renders filename and meta in the header", () => {
    render(<CodeBlock code="x" filename="config.yaml" meta={<span>v13</span>} />);
    expect(screen.getByText("config.yaml")).toBeInTheDocument();
    expect(screen.getByText("v13")).toBeInTheDocument();
  });
});

describe("CommandBlock", () => {
  it("joins multiple commands one per line and copies them without prompts", async () => {
    render(<CommandBlock command={["docker pull nginx", "docker run nginx"]} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("docker pull nginx\ndocker run nginx"));
    expect(screen.getAllByText("$")).toHaveLength(2);
  });
});
