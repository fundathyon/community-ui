import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EnvironmentVariable, EnvironmentVariables } from "../../src/components/dev";
import { maskSecret } from "../../src/lib/format";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("EnvironmentVariable", () => {
  it("renders name and value in mono", () => {
    render(<EnvironmentVariable name="LOG_LEVEL" value="info" />);
    expect(screen.getByText("LOG_LEVEL")).toBeInTheDocument();
    expect(screen.getByText("info")).toBeInTheDocument();
  });

  it("masks secret values and shows the badge marker", () => {
    render(<EnvironmentVariable name="JWT_SECRET" value="super-secret-value" secret />);
    expect(screen.queryByText("super-secret-value")).not.toBeInTheDocument();
    expect(screen.getByText(maskSecret("super-secret-value"))).toBeInTheDocument();
    expect(screen.getByText("Secret")).toBeInTheDocument();
  });

  it("copies NAME=value with the FULL value, even when masked", async () => {
    render(<EnvironmentVariable name="JWT_SECRET" value="super-secret-value" secret />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("JWT_SECRET=super-secret-value"));
  });
});

describe("EnvironmentVariables", () => {
  it("renders the header and one row per variable", () => {
    render(
      <EnvironmentVariables
        title="production/.env"
        meta="3 variables · 1 secret"
        variables={[
          { name: "DATABASE_URL", value: "postgres://db:5432/app" },
          { name: "LOG_LEVEL", value: "info" },
          { name: "JWT_SECRET", value: "shhh-not-for-eyes", secret: true },
        ]}
      />,
    );
    expect(screen.getByText("production/.env")).toBeInTheDocument();
    expect(screen.getByText("3 variables · 1 secret")).toBeInTheDocument();
    expect(screen.getByText("DATABASE_URL")).toBeInTheDocument();
    expect(screen.getByText("LOG_LEVEL")).toBeInTheDocument();
    expect(screen.getByText("JWT_SECRET")).toBeInTheDocument();
    expect(screen.queryByText("shhh-not-for-eyes")).not.toBeInTheDocument();
  });
});
