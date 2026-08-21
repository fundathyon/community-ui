import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardFooter, CardHeader } from "../../src/components/layout/card";

describe("Card", () => {
  it("has a border and NO shadow — cards do not float (§15)", () => {
    render(<Card data-testid="card">contenido</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("border-border");
    expect(card.className).toContain("bg-surface");
    expect(card.className).toContain("rounded-xl");
    expect(card.className).not.toMatch(/shadow/);
  });

  it("interactive adds surface hover and a focus-within ring", () => {
    render(<Card interactive data-testid="card" />);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("hover:bg-surface-hover");
    expect(card.className).toContain("focus-within:outline-focus");
  });

  it("is not interactive by default", () => {
    render(<Card data-testid="card" />);
    expect(screen.getByTestId("card").className).not.toContain("hover:bg-surface-hover");
  });

  it("composes header (title + actions), body and footer", async () => {
    const user = userEvent.setup();
    render(
      <Card interactive>
        <CardHeader actions={<button type="button">Menú</button>}>
          <a href="/repos/nginx">nginx</a>
        </CardHeader>
        <CardBody>Última sincronización hace 2 h</CardBody>
        <CardFooter data-testid="footer">
          <button type="button">Guardar</button>
        </CardFooter>
      </Card>,
    );
    // The card's title is the real link (§15).
    const title = screen.getByRole("link", { name: "nginx" });
    await user.tab();
    expect(title).toHaveFocus();
    expect(screen.getByRole("button", { name: "Menú" })).toBeInTheDocument();
    expect(screen.getByText("Última sincronización hace 2 h")).toBeInTheDocument();
    expect(screen.getByTestId("footer").className).toContain("border-t");
  });
});
