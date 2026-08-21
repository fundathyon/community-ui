"use client";

import {
  AppSwitcher,
  CommandPalette,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Kbd,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarSection,
  SidebarTrigger,
  Topbar,
  UserMenu,
  useCommandPalette,
  useTheme,
  type CommandGroup,
  type ThemeChoice,
} from "@foundathyon/community-ui";
import {
  BookOpen,
  Boxes,
  CalendarClock,
  FormInput,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Lock,
  Mail,
  Monitor,
  Moon,
  Package,
  RefreshCw,
  Search,
  Sun,
  TerminalSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { DEMO_PRODUCTS, useDemoProduct } from "./demo-providers";

const NAV = [
  {
    section: "Suite",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/users", label: "Usuarios", icon: Users },
      { href: "/vault", label: "Vault · Configs", icon: Lock },
      { href: "/dokgistry", label: "Dokgistry · Repos", icon: Package },
      { href: "/cronify", label: "Cronify · Jobs", icon: CalendarClock },
    ],
  },
  {
    section: "Design System",
    items: [
      { href: "/components", label: "Componentes", icon: Boxes },
      { href: "/forms", label: "Formularios", icon: FormInput },
      { href: "/developer", label: "Developer UI", icon: TerminalSquare },
      { href: "/charts", label: "Visualización", icon: Gauge },
      { href: "/docs-demo", label: "Documentación", icon: BookOpen },
      { href: "/auth-demo", label: "Autenticación", icon: KeyRound },
      { href: "/emails", label: "Emails", icon: Mail },
    ],
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const labels: Record<ThemeChoice, string> = { dark: "Tema oscuro", light: "Tema claro", system: "Tema del sistema" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<IconButton icon={icon} label={labels[theme]} variant="ghost" />} />
      <DropdownMenuContent align="end">
        <DropdownMenuItem icon={Moon} onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem icon={Sun} onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem icon={Monitor} onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProductMark() {
  const { product } = useDemoProduct();
  const meta = DEMO_PRODUCTS.find((p) => p.id === product);
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="grid size-6 place-items-center rounded-md bg-accent-solid text-caption font-bold text-accent-on-solid">
        {meta?.name.slice(0, 1)}
      </span>
      <span className="text-h5 text-text">{meta?.name}</span>
      <span className="rounded-full border border-border px-1.5 text-caption text-text-muted">Community</span>
    </span>
  );
}

function useDemoCommandGroups(): CommandGroup[] {
  const router = useRouter();
  const { setTheme } = useTheme();

  return [
    {
      heading: "Ir a",
      items: NAV.flatMap((group) => group.items).map((item) => ({
        id: item.href,
        label: item.label,
        icon: <item.icon size={16} />,
        onSelect: () => router.push(item.href),
      })),
    },
    {
      heading: "Acciones",
      items: [
        {
          id: "sync-registry",
          label: "Sincronizar registry",
          icon: <RefreshCw size={16} />,
          keywords: ["dokgistry", "sync"],
          onSelect: () => {},
        },
        {
          id: "toggle-theme",
          label: "Cambiar a tema claro",
          icon: <Sun size={16} />,
          keywords: ["dark", "light", "tema"],
          onSelect: () => setTheme("light"),
        },
      ],
    },
  ];
}

export function DemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { product, setProduct } = useDemoProduct();
  const palette = useCommandPalette();
  const commandGroups = useDemoCommandGroups();

  return (
    <SidebarProvider storageKey="fdn-demo-sidebar">
      <div className="flex min-h-dvh">
        <Sidebar className="max-md:hidden">
          <SidebarHeader>
            <ProductMark />
          </SidebarHeader>
          {NAV.map((group) => (
            <SidebarSection key={group.section} label={group.section}>
              {group.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  current={pathname === item.href}
                  render={(props) => <Link {...props} href={props.href ?? item.href} />}
                />
              ))}
            </SidebarSection>
          ))}
          <SidebarFooter>
            <span className="text-caption text-text-muted">
              Design System v2 · <Kbd>⌘B</Kbd>
            </span>
          </SidebarFooter>
        </Sidebar>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            leading={
              <span className="inline-flex items-center gap-1">
                <SidebarTrigger />
                <span className="md:hidden">
                  <ProductMark />
                </span>
              </span>
            }
            trailing={
              <span className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => palette.setOpen(true)}
                  className="hidden h-control-sm items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 text-body-sm text-text-muted transition-colors hover:bg-surface-hover sm:inline-flex"
                >
                  <Search size={14} />
                  Buscar
                  <Kbd>⌘K</Kbd>
                </button>
                <IconButton icon={Search} label="Buscar" variant="ghost" onClick={() => palette.setOpen(true)} className="sm:hidden" />
                <AppSwitcher
                  label="Cambiar de producto"
                  products={DEMO_PRODUCTS.map((p) => ({
                    id: p.id,
                    name: p.name,
                    current: p.id === product,
                    onSelect: () => setProduct(p.id),
                  }))}
                />
                <ThemeToggle />
                <UserMenu
                  name="Rafa"
                  email="rafa@foundathyon.dev"
                  items={[
                    { label: "Perfil", onSelect: () => router.push("/auth-demo") },
                    { label: "Ajustes", onSelect: () => {} },
                  ]}
                  signOutLabel="Cerrar sesión"
                  onSignOut={() => {}}
                />
              </span>
            }
          />
          <main className="min-w-0 flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
      <CommandPalette
        open={palette.open}
        onOpenChange={palette.setOpen}
        items={commandGroups}
        placeholder="Buscar en la vista…"
        recentLabel="Recientes"
        emptyMessage="Sin resultados"
        label="Command menu"
      />
    </SidebarProvider>
  );
}
