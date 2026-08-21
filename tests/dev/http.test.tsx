import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HttpRequest, HttpResponse, statusTone } from "../../src/components/dev";

describe("statusTone", () => {
  it("maps status ranges to semantic tones (§20)", () => {
    expect(statusTone(200)).toBe("success");
    expect(statusTone(204)).toBe("success");
    expect(statusTone(301)).toBe("info");
    expect(statusTone(404)).toBe("warning");
    expect(statusTone(409)).toBe("warning");
    expect(statusTone(500)).toBe("danger");
    expect(statusTone(503)).toBe("danger");
    expect(statusTone(101)).toBe("info");
  });
});

describe("HttpRequest", () => {
  it("maps verbs to tones by effect: read info, write success, destroy danger", () => {
    const { rerender } = render(<HttpRequest method="GET" path="/v1/users" />);
    expect(screen.getByText("GET").className).toContain("text-info");
    rerender(<HttpRequest method="POST" path="/v1/users" />);
    expect(screen.getByText("POST").className).toContain("text-success");
    rerender(<HttpRequest method="PATCH" path="/v1/users" />);
    expect(screen.getByText("PATCH").className).toContain("text-success");
    rerender(<HttpRequest method="DELETE" path="/v1/users" />);
    expect(screen.getByText("DELETE").className).toContain("text-danger");
  });

  it("renders path, toned status chip and formatted duration", () => {
    render(<HttpRequest method="GET" path="/v1/users" status={200} statusText="OK" duration={42} />);
    expect(screen.getByText("/v1/users")).toBeInTheDocument();
    expect(screen.getByText("200 OK").className).toContain("text-success");
    expect(screen.getByText("42 ms")).toBeInTheDocument();
  });

  it("uses readable units for durations of a second or more", () => {
    render(<HttpRequest method="GET" path="/v1/users" duration={1500} />);
    expect(screen.getByText("2 s")).toBeInTheDocument();
  });

  it("expands its body slot behind a disclosure toggle", () => {
    render(
      <HttpRequest method="GET" path="/v1/users" status={200}>
        <span>request detail</span>
      </HttpRequest>,
    );
    expect(screen.queryByText("request detail")).not.toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Show details" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("request detail")).toBeInTheDocument();
  });
});

describe("HttpResponse", () => {
  it("tones the status chip: 2xx success, 3xx info, 4xx warning, 5xx danger", () => {
    const { rerender } = render(<HttpResponse status={200} statusText="OK" />);
    expect(screen.getByText("200 OK").className).toContain("text-success");
    rerender(<HttpResponse status={302} statusText="Found" />);
    expect(screen.getByText("302 Found").className).toContain("text-info");
    rerender(<HttpResponse status={404} statusText="Not Found" />);
    expect(screen.getByText("404 Not Found").className).toContain("text-warning");
    rerender(<HttpResponse status={503} />);
    expect(screen.getByText("503").className).toContain("text-danger");
  });

  it("renders duration and body", () => {
    render(
      <HttpResponse status={200} statusText="OK" duration={42}>
        <span>response body</span>
      </HttpResponse>,
    );
    expect(screen.getByText("42 ms")).toBeInTheDocument();
    expect(screen.getByText("response body")).toBeInTheDocument();
  });
});
