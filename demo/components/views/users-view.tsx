"use client";

import {
  Button,
  DataTable,
  PageHeader,
  SearchInput,
  Stack,
  type DataTableColumn,
} from "@foundathyon/community-ui";
import { KeyRound, Trash2, UserCog } from "lucide-react";
import { useState } from "react";

interface DemoUser {
  id: string;
  name: string;
  email: string;
  provider: string;
  role: string;
  created: string;
  lastActive: string;
  status: "active" | "locked" | "pending";
}

const USERS: DemoUser[] = [
  { id: "9424bb43-52c7-4c97-a1e2-8f0b7c1d4e5a", name: "Oswaldo Ríos", email: "osw@gmail.com", provider: "Email", role: "default", created: "2026-08-08", lastActive: "2026-08-08T09:00:00Z", status: "active" },
  { id: "abd034dd-4b45-4572-9c3a-1e2f3a4b5c6d", name: "Rafael Zamora", email: "rafa@gmail.com", provider: "Google", role: "admin", created: "2026-08-07", lastActive: "2026-08-21T14:56:00Z", status: "active" },
  { id: "b1c63757-e14f-4933-8a7b-2c3d4e5f6a7b", name: "Pulse Signin", email: "pulse-signin@example.com", provider: "WebAuthn", role: "default", created: "2026-06-13", lastActive: "2026-08-19T11:00:00Z", status: "locked" },
  { id: "c2d74868-f250-4a44-9b8c-3d4e5f6a7b8c", name: "María Fernández", email: "maria@foundathyon.dev", provider: "Google", role: "admin", created: "2026-05-02", lastActive: "2026-08-21T14:52:00Z", status: "active" },
  { id: "d3e85979-0361-4b55-ac9d-4e5f6a7b8c9d", name: "Nuevo invitado", email: "invited@example.com", provider: "Email", role: "default", created: "2026-08-20", lastActive: "2026-08-20T10:00:00Z", status: "pending" },
];

export function UsersView() {
  const [query, setQuery] = useState("");

  const columns: DataTableColumn<DemoUser>[] = [
    {
      id: "user",
      header: "Usuario",
      type: "user",
      primary: true,
      accessor: (u) => ({ id: u.id, name: u.name, email: u.email }),
    },
    { id: "provider", header: "Provider", accessor: (u) => u.provider, sortable: true, hideBelow: "md" },
    { id: "role", header: "Rol", type: "text", accessor: (u) => u.role, sortable: true },
    { id: "created", header: "Creado", type: "date", accessor: (u) => u.created, sortable: true, hideBelow: "lg" },
    { id: "status", header: "Estado", type: "status", accessor: (u) => u.status },
    { id: "lastActive", header: "Última actividad", type: "relative-date", accessor: (u) => u.lastActive, sortable: true },
  ];

  return (
    <Stack gap={6}>
      <PageHeader
        title="Usuarios"
        subtitle="Invita miembros, asigna roles y revoca el acceso por organización."
        actions={<Button variant="primary">Invitar miembro</Button>}
        toolbar={
          <SearchInput
            value={query}
            onValueChange={(v) => setQuery(v)}
            placeholder="Buscar por nombre o email…"
            shortcutHint="/"
            className="max-w-xs"
          />
        }
      />
      <DataTable
        columns={columns}
        data={USERS}
        rowId={(u) => u.id}
        globalFilter={query}
        sorting={{}}
        enableSelection
        stickyHeader
        pagination={{ pageSize: 10 }}
        bulkActions={(rows) => <Button variant="destructive-subtle" leading={<Trash2 size={14} />}>Eliminar {rows.length}</Button>}
        rowActions={(u) => [
          { label: "Editar rol", icon: UserCog, onSelect: () => {} },
          { label: "Rotar credenciales", icon: KeyRound, onSelect: () => {} },
          { label: `Revocar acceso de ${u.name}`, icon: Trash2, onSelect: () => {}, destructive: true },
        ]}
        emptyState={{ title: "Aún no hay usuarios", description: "Invita al primer miembro de la organización." }}
        noResultsState={{ title: "Sin resultados", description: "Prueba con otro término de búsqueda." }}
      />
    </Stack>
  );
}
