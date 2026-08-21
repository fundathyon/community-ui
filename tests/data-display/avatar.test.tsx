import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "../../src/components/data-display/avatar";
import { AvatarGroup } from "../../src/components/data-display/avatar-group";

describe("Avatar", () => {
  it("computes initials from a two-word name", () => {
    render(<Avatar name="María Ruiz" />);
    expect(screen.getByText("MR")).toBeInTheDocument();
  });

  it("exposes an accessible name", () => {
    render(<Avatar name="María Ruiz" />);
    expect(screen.getByRole("img", { name: "María Ruiz" })).toBeInTheDocument();
  });

  it("derives a deterministic wash from the name — same name, same class", () => {
    render(
      <>
        <Avatar name="María Ruiz" />
        <Avatar name="María Ruiz" />
      </>,
    );
    const [first, second] = screen.getAllByText("MR");
    expect(first!.className).toBe(second!.className);
    // and it is one of the semantic washes, never a random color
    expect(first!.className).toMatch(/bg-(info|success|warning|danger)-bg|bg-surface-hover/);
  });

  it("renders a presence dot only when asked, with the right tone", () => {
    const { container, rerender } = render(<Avatar name="Ana" presence="online" />);
    const online = container.querySelector('[data-presence="online"]');
    expect(online).not.toBeNull();
    expect(online!.className).toContain("bg-success");

    rerender(<Avatar name="Ana" presence="offline" />);
    const offline = container.querySelector('[data-presence="offline"]');
    expect(offline!.className).toContain("bg-border-strong");
  });

  it("has no presence dot by default", () => {
    const { container } = render(<Avatar name="Ana" />);
    expect(container.querySelector("[data-presence]")).toBeNull();
  });
});

describe("AvatarGroup", () => {
  it("cuts at 3 and shows a +n counter for the remainder", () => {
    render(
      <AvatarGroup>
        <Avatar name="Ann One" />
        <Avatar name="Bee Two" />
        <Avatar name="Cee Three" />
        <Avatar name="Dee Four" />
        <Avatar name="Eff Five" />
      </AvatarGroup>,
    );
    // three avatars rendered + the counter
    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("respects a custom max", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="Ann One" />
        <Avatar name="Bee Two" />
        <Avatar name="Cee Three" />
      </AvatarGroup>,
    );
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("shows no counter when everything fits", () => {
    render(
      <AvatarGroup>
        <Avatar name="Ann One" />
        <Avatar name="Bee Two" />
      </AvatarGroup>,
    );
    expect(screen.queryByText(/^\+/)).toBeNull();
  });
});
