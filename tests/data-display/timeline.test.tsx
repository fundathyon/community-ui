import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineItem } from "../../src/components/data-display/timeline";

describe("Timeline", () => {
  it("renders the title and meta lines", () => {
    render(
      <Timeline>
        <TimelineItem marker={{ status: "active" }} title="Token ci-deploy creado" meta="hace 2 h · maría@foundathyon.dev" />
        <TimelineItem marker={{ status: "revoked" }} title="Enlace compartido revocado" meta="hace 5 h · sistema" />
      </Timeline>,
    );
    expect(screen.getByText("Token ci-deploy creado")).toBeInTheDocument();
    expect(screen.getByText("hace 2 h · maría@foundathyon.dev")).toBeInTheDocument();
    expect(screen.getByText("Enlace compartido revocado")).toBeInTheDocument();
  });

  it("makes the title a disclosure when there is expandable detail", async () => {
    const user = userEvent.setup();
    render(
      <Timeline>
        <TimelineItem title="Registry sincronizado" meta="ayer, 03:00">
          <p>128 repositorios reconciliados</p>
        </TimelineItem>
      </Timeline>,
    );
    const trigger = screen.getByRole("button", { name: /Registry sincronizado/ });
    expect(trigger).toBeInTheDocument();
    await user.click(trigger);
    expect(await screen.findByText("128 repositorios reconciliados")).toBeInTheDocument();
  });

  it("renders a plain line when there is no detail", () => {
    render(
      <Timeline>
        <TimelineItem title="Registry sincronizado" meta="ayer, 03:00" />
      </Timeline>,
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
