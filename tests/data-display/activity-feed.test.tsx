import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActivityFeed, ActivityFeedItem } from "../../src/components/data-display/activity-feed";
import { formatRelativeDate } from "../../src/lib/format";

describe("ActivityFeed", () => {
  it("renders the event grammar (actor · verb · resource · detail) in one line", () => {
    render(
      <ActivityFeed>
        <ActivityFeedItem
          actor={{ name: "Rafa", email: "rafa@gmail.com" }}
          action={
            <>
              <strong>rafa@gmail.com</strong> cambió el rol de <strong>osw@gmail.com</strong>
            </>
          }
          timestamp={new Date()}
        />
      </ActivityFeed>,
    );
    expect(screen.getByText(/cambió el rol de/)).toBeInTheDocument();
    // actor drives an avatar (a person)
    expect(screen.getByRole("img", { name: "Rafa" })).toBeInTheDocument();
  });

  it("renders a system actor with an icon, never a fake person", () => {
    render(
      <ActivityFeed>
        <ActivityFeedItem
          actor={{ system: true }}
          action={<>revocó el enlace compartido de production/api-keys</>}
          timestamp={new Date()}
        />
      </ActivityFeed>,
    );
    expect(screen.getByRole("img", { name: "System" })).toBeInTheDocument();
  });

  it("shows a relative timestamp with the absolute form in a tooltip", async () => {
    const user = userEvent.setup();
    const ts = new Date(Date.now() - 2 * 60 * 1000);
    const { display, absolute } = formatRelativeDate(ts);
    render(
      <ActivityFeed>
        <ActivityFeedItem actor={{ name: "Rafa" }} action={<>hizo algo</>} timestamp={ts} />
      </ActivityFeed>,
    );
    const time = screen.getByText(display);
    expect(time.tagName).toBe("TIME");
    await user.hover(time);
    expect(await screen.findByText(absolute, undefined, { timeout: 2000 })).toBeInTheDocument();
  });

  it("copies technical metadata values on click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    // defineProperty (not Object.assign): a prior userEvent.setup() in this file
    // installs a getter-only navigator.clipboard that assignment cannot overwrite.
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(
      <ActivityFeed>
        <ActivityFeedItem
          actor={{ name: "Rafa" }}
          action={<>cambió el rol</>}
          timestamp={new Date()}
          technical={{ ip: "85.61.204.12", traceId: "4a7f2e91", event: "accounts.role.update" }}
        />
      </ActivityFeed>,
    );
    fireEvent.click(screen.getByText("85.61.204.12"));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("85.61.204.12"));
  });

  it("expands a diff below the event, not the reverse", async () => {
    const user = userEvent.setup();
    render(
      <ActivityFeed>
        <ActivityFeedItem actor={{ name: "Rafa" }} action={<>cambió el rol</>} timestamp={new Date()} detailsLabel="Ver diff">
          <div>admin → developer</div>
        </ActivityFeedItem>
      </ActivityFeed>,
    );
    // the diff is hidden until the disclosure is opened
    expect(screen.queryByText("admin → developer")).toBeNull();
    await user.click(screen.getByRole("button", { name: /Ver diff/ }));
    expect(await screen.findByText("admin → developer")).toBeInTheDocument();
  });
});
