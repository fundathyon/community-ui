import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Terminal, TerminalLine } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("Terminal", () => {
  it("renders the title and prompts on input lines only", () => {
    render(
      <Terminal title="~/project">
        <TerminalLine>docker pull nginx</TerminalLine>
        <TerminalLine kind="output">1.27: Pulling from library/nginx</TerminalLine>
        <TerminalLine kind="comment"># takes a while</TerminalLine>
      </Terminal>,
    );
    expect(screen.getByText("~/project")).toBeInTheDocument();
    expect(screen.getAllByText("$")).toHaveLength(1);
    expect(screen.getByText("1.27: Pulling from library/nginx")).toBeInTheDocument();
  });

  it("copies input lines only — no prompts, no output", async () => {
    render(
      <Terminal>
        <TerminalLine>docker pull nginx</TerminalLine>
        <TerminalLine kind="output">Done.</TerminalLine>
        <TerminalLine>docker run nginx</TerminalLine>
      </Terminal>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy commands" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("docker pull nginx\ndocker run nginx"));
  });

  it("hides the copy button when there is nothing to copy", () => {
    render(
      <Terminal>
        <TerminalLine kind="output">log output</TerminalLine>
      </Terminal>,
    );
    expect(screen.queryByRole("button", { name: "Copy commands" })).not.toBeInTheDocument();
  });
});
