import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ApiEndpoint } from "../../src/docs/api-endpoint";
import { ApiParameters } from "../../src/docs/api-parameters";
import { ApiResponse } from "../../src/docs/api-response";
import { ApiSchema, EnumTable, PropertyTable, type SchemaNode } from "../../src/docs/api-schema";

describe("ApiEndpoint", () => {
  it("shows the method chip, path, description and deprecation badge", () => {
    render(
      <ApiEndpoint method="GET" path="/v1/configs" description="List the configs." deprecated />,
    );
    expect(screen.getByText("GET")).toBeInTheDocument();
    expect(screen.getByText("/v1/configs")).toBeInTheDocument();
    expect(screen.getByText("List the configs.")).toBeInTheDocument();
    expect(screen.getByText("Deprecated")).toBeInTheDocument();
  });
});

describe("ApiParameters", () => {
  it("renders required badges and groups parameters by their `in`", () => {
    render(
      <ApiParameters
        params={[
          { name: "id", type: "string", required: true, in: "path", description: "The id." },
          { name: "environment", type: "string", required: true, in: "query", description: "prod · staging" },
          { name: "limit", type: "integer", default: "20", in: "query", description: "1–100." },
        ]}
      />,
    );

    expect(screen.getByText("Path parameters")).toBeInTheDocument();
    expect(screen.getByText("Query parameters")).toBeInTheDocument();

    expect(screen.getByText("environment")).toBeInTheDocument();
    expect(screen.getByText("id")).toBeInTheDocument();
    // two required parameters → two badges
    expect(screen.getAllByText("required")).toHaveLength(2);
    // default value surfaced
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("lets the required label be overridden", () => {
    render(<ApiParameters requiredLabel="obligatorio" params={[{ name: "q", type: "string", required: true }]} />);
    expect(screen.getByText("obligatorio")).toBeInTheDocument();
  });
});

describe("ApiResponse", () => {
  it("heads the block with a status chip toned by the code", () => {
    render(
      <ApiResponse status={404} statusText="Not Found">
        <pre>body</pre>
      </ApiResponse>,
    );
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText("Response")).toBeInTheDocument();
  });
});

describe("ApiSchema", () => {
  const schema: SchemaNode = {
    type: "object",
    properties: [
      {
        name: "user",
        type: "object",
        required: true,
        properties: [
          { name: "email", type: "string", description: "The email." },
          { name: "role", type: "string", enum: ["admin", "default"] },
        ],
      },
      { name: "count", type: "integer" },
    ],
  };

  it("expands top-level objects by default, shows enum badges, and collapses nested nodes", async () => {
    const user = userEvent.setup();
    render(<ApiSchema schema={schema} />);

    // top level open → nested fields visible
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();
    // enum values as badges
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("default")).toBeInTheDocument();

    // collapse the "user" object
    await user.click(screen.getByRole("button", { name: "Collapse" }));
    expect(screen.queryByText("email")).not.toBeInTheDocument();

    // expand it again
    await user.click(screen.getByRole("button", { name: "Expand" }));
    expect(screen.getByText("email")).toBeInTheDocument();
  });
});

describe("PropertyTable / EnumTable", () => {
  it("renders a flat property list with required markers", () => {
    render(
      <PropertyTable
        rows={[
          { name: "environment", type: "string", required: true, description: "Target env." },
          { name: "limit", type: "integer", description: "Page size." },
        ]}
      />,
    );
    expect(screen.getByText("environment")).toBeInTheDocument();
    expect(screen.getByText("required")).toBeInTheDocument();
  });

  it("renders an enum value list", () => {
    render(
      <EnumTable
        values={[
          { value: "production", description: "Live." },
          { value: "staging", description: "Pre-prod." },
        ]}
      />,
    );
    expect(screen.getByText("production")).toBeInTheDocument();
    expect(screen.getByText("Pre-prod.")).toBeInTheDocument();
  });
});
