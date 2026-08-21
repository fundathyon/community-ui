"use client";

import { FoundathyonProvider, ToastProvider, TooltipProvider, type Product } from "@foundathyon/community-ui";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface DemoProductContextValue {
  product: Product;
  setProduct: (product: Product) => void;
}

const DemoProductContext = createContext<DemoProductContextValue>({
  product: "vault",
  setProduct: () => {},
});

export const DEMO_PRODUCTS: { id: Product; name: string; description: string }[] = [
  { id: "vault", name: "Vault", description: "Configs y secretos" },
  { id: "dokgistry", name: "Dokgistry", description: "Registry de imágenes" },
  { id: "accounts", name: "Accounts", description: "Identidad y acceso" },
  { id: "cronify", name: "Cronify", description: "Jobs y schedules" },
  { id: "mocky", name: "Mocky", description: "Mocking de APIs" },
];

export function DemoProviders({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<Product>("vault");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("fdn-demo-product") as Product | null;
      if (stored && DEMO_PRODUCTS.some((p) => p.id === stored)) setProductState(stored);
    } catch {
      /* no storage */
    }
  }, []);

  const setProduct = (next: Product) => {
    setProductState(next);
    try {
      window.localStorage.setItem("fdn-demo-product", next);
    } catch {
      /* no storage */
    }
  };

  return (
    <DemoProductContext.Provider value={{ product, setProduct }}>
      <FoundathyonProvider product={product}>
        <TooltipProvider>
          <ToastProvider>{children}</ToastProvider>
        </TooltipProvider>
      </FoundathyonProvider>
    </DemoProductContext.Provider>
  );
}

export function useDemoProduct() {
  return useContext(DemoProductContext);
}
