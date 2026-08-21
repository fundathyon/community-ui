import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CurlBlock, DockerCommand, YamlViewer, buildCurl } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("buildCurl", () => {
  it("builds a multi-line curl with \\ continuations, URL last", () => {
    expect(
      buildCurl({
        url: "https://vault.foundathyon.dev/v1/configs",
        headers: { Authorization: "Bearer $TOKEN", Accept: "application/json" },
      }),
    ).toBe(
      'curl \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Accept: application/json" \\\n  https://vault.foundathyon.dev/v1/configs',
    );
  });

  it("adds -X only for non-GET and stringifies object bodies", () => {
    const cmd = buildCurl({
      method: "post",
      url: "https://api.dev/v1/things",
      body: { name: "it's" },
    });
    expect(cmd).toContain("curl -X POST");
    expect(cmd).toContain(`-d '{"name":"it'\\''s"}'`);
    expect(cmd.trimEnd().endsWith("https://api.dev/v1/things")).toBe(true);
  });

  it("keeps a bare GET on a single line", () => {
    expect(buildCurl({ url: "https://api.dev/v1/things" })).toBe("curl https://api.dev/v1/things");
  });
});

describe("CurlBlock / DockerCommand", () => {
  it("CurlBlock copies the built curl command", async () => {
    render(<CurlBlock url="https://api.dev/v1/things" headers={{ Accept: "application/json" }} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        buildCurl({ url: "https://api.dev/v1/things", headers: { Accept: "application/json" } }),
      ),
    );
  });

  it("DockerCommand assembles verb, args and image", async () => {
    render(<DockerCommand command="run" image="registry.foundathyon.dev/library/nginx:1.27" args={["-d", "-p 8080:80"]} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("docker run -d -p 8080:80 registry.foundathyon.dev/library/nginx:1.27"),
    );
  });
});

describe("YamlViewer", () => {
  it("masks secret keys line-wise in display AND copy", async () => {
    render(
      <YamlViewer
        yaml={"api_key: sk_live_de96abcd\nreplicas: 4"}
        secretKeys={["api_key"]}
        filename="config.yaml"
      />,
    );
    expect(screen.queryByText(/sk_live_de96abcd/)).not.toBeInTheDocument();
    expect(screen.getByText("config.yaml")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("api_key: ••••••••••••\nreplicas: 4"),
    );
  });
});
