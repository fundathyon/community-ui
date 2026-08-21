import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductSelector } from "../../src/docs/product-selector";
import { VersionSelector } from "../../src/docs/version-selector";

describe("VersionSelector", () => {
  it("fires onChange with the chosen version value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <VersionSelector
        current="2.4"
        onChange={onChange}
        versions={[
          { label: "v2.4", value: "2.4" },
          { label: "v2.3", value: "2.3" },
        ]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Version" }));
    await screen.findByRole("listbox");
    await user.click(screen.getByRole("option", { name: /v2.3/ }));

    expect(onChange).toHaveBeenLastCalledWith("2.3");
  });
});

describe("ProductSelector", () => {
  it("fires onChange with the chosen product and scopes the accent dot", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { baseElement } = render(
      <ProductSelector
        current="vault"
        onChange={onChange}
        products={[
          { label: "Vault", value: "vault", product: "vault" },
          { label: "Dokgistry", value: "dokgistry", product: "dokgistry" },
        ]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Product" }));
    await screen.findByRole("listbox");

    // the accent dot carries data-fdn-product for the token cascade (§02)
    expect(baseElement.querySelector('[data-fdn-product="dokgistry"]')).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: /Dokgistry/ }));
    expect(onChange).toHaveBeenLastCalledWith("dokgistry");
  });
});
