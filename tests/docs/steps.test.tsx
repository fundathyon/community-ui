import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Step, Steps } from "../../src/docs/steps";

describe("Steps", () => {
  it("renders an ordered list numbered automatically", () => {
    render(
      <Steps>
        <Step title="Create a project">Do the first thing.</Step>
        <Step title="Generate a token">Do the second thing.</Step>
        <Step title="Call the API">Do the third thing.</Step>
      </Steps>,
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);

    // Counter circles carry the 1-based numbers.
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByText("Create a project")).toBeInTheDocument();
    expect(screen.getByText("Call the API")).toBeInTheDocument();
  });
});
