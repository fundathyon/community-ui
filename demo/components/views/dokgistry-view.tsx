"use client";

import {
  Badge,
  Banner,
  Button,
  Card,
  CardBody,
  CardHeader,
  CodeBlock,
  DataTable,
  DataTableColumnsButton,
  DataTableFilterButton,
  DescriptionList,
  Grid,
  PageHeader,
  SearchInput,
  Stack,
  StatusBadge,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  type DataTableColumn,
  type StatusKey,
} from "@foundathyon/community-ui";
import { Copy, Download, Package, Trash2 } from "lucide-react";
import { useState } from "react";

type ImageStatus = Extract<StatusKey, "protected" | "processing" | "syncing" | "archived">;

interface RegistryImage {
  id: string;
  name: string;
  tags: string[];
  digest: string;
  size: number;
  status: ImageStatus;
  pushed: string;
}

const STATUS_COPY: Record<ImageStatus, string> = {
  protected: "Protegida",
  processing: "Escaneando",
  syncing: "Sincronizando",
  archived: "Eliminada",
};

const IMAGES: RegistryImage[] = [
  { id: "img_01", name: "nginx", tags: ["1.27", "latest"], digest: "sha256:4a3ed895caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4", size: 148_897_792, status: "protected", pushed: "2026-08-20T18:12:00Z" },
  { id: "img_02", name: "api", tags: ["v2.4.1"], digest: "sha256:9bc0121f4d7e8a0b3c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4", size: 92_274_688, status: "syncing", pushed: "2026-08-21T14:40:00Z" },
  { id: "img_03", name: "legacy-worker", tags: ["v0.9"], digest: "sha256:1f77aa2d3c4b5a6978869504132231405f6e7d8c9b0a1928374655647382910aa", size: 325_058_560, status: "archived", pushed: "2025-11-02T11:00:00Z" },
  { id: "img_04", name: "postgres", tags: ["16.4"], digest: "sha256:0c9e8d7b6a5f4e3d2c1b0a99887766554433221100ffeeddccbbaa9988776655", size: 438_304_768, status: "processing", pushed: "2026-08-18T22:30:00Z" },
];

const NGINX_FACTS = [
  { label: "Digest", value: "sha256:4a3ed8…955b46d4", mono: true },
  { label: "Arquitecturas", value: "linux/amd64 · linux/arm64" },
  { label: "Capas", value: "6 · 142 MB comprimido" },
  { label: "Firma", value: "cosign · verificada", mono: false },
];

export function DokgistryView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  const columns: DataTableColumn<RegistryImage>[] = [
    {
      id: "image",
      header: "Imagen",
      primary: true,
      sortable: true,
      accessor: (i) => `${i.name} ${i.tags.join(" ")}`,
      cell: (i) => (
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate font-semibold text-text">{i.name}</span>
          <span className="truncate text-text-muted">· {i.tags.join(", ")}</span>
        </span>
      ),
    },
    { id: "digest", header: "Digest", type: "digest", accessor: (i) => i.digest, hideBelow: "md" },
    { id: "size", header: "Tamaño", type: "bytes", accessor: (i) => i.size, sortable: true },
    {
      id: "status",
      header: "Estado",
      type: "status",
      accessor: (i) => i.status,
      cell: (i) => <StatusBadge status={i.status}>{STATUS_COPY[i.status]}</StatusBadge>,
    },
    { id: "pushed", header: "Subida", type: "relative-date", accessor: (i) => i.pushed, sortable: true, hideBelow: "lg" },
  ];

  const rows = statusFilter.length === 0 ? IMAGES : IMAGES.filter((i) => statusFilter.includes(i.status));

  return (
    <Stack gap={8}>
      <PageHeader
        title="Dokgistry · Repositorios"
        subtitle="Registry privado de imágenes de contenedor de la organización acme."
        actions={<Button variant="primary" leading={<Package size={14} />}>Nuevo repositorio</Button>}
      />

      <Banner tone="warning" action={<Button variant="ghost" size="sm">Ver uso por repositorio</Button>}>
        Almacenamiento al 89 % (445 GB de 500 GB). Elimina tags sin referencias antes de que se bloqueen los push.
      </Banner>

      {/* §14 — everything inside one frame: toolbar, table, footer. */}
      <DataTable
        columns={columns}
        data={rows}
        rowId={(i) => i.id}
        density="comfortable"
        globalFilter={query}
        sorting={{ defaultState: { id: "image", direction: "asc" } }}
        enableSelection
        stickyHeader
        columnVisibility={{ state: columnVisibility, onChange: setColumnVisibility }}
        toolbar={
          <>
            <SearchInput
              value={query}
              onValueChange={setQuery}
              placeholder="Filtrar imágenes…"
              clearLabel="Limpiar búsqueda"
              wrapperClassName="w-56"
            />
            <DataTableFilterButton
              label="Estado"
              value={statusFilter}
              onChange={setStatusFilter}
              clearLabel="Limpiar"
              options={(Object.keys(STATUS_COPY) as ImageStatus[]).map((status) => ({
                value: status,
                label: STATUS_COPY[status],
                count: IMAGES.filter((i) => i.status === status).length,
              }))}
            />
            <DataTableColumnsButton
              columns={columns}
              value={columnVisibility}
              onChange={setColumnVisibility}
              label="Columnas"
              lockedIds={["image"]}
            />
          </>
        }
        bulkActions={() => (
          <Button variant="destructive-subtle" className="border border-danger-border">
            Eliminar selección
          </Button>
        )}
        getRowProps={(i) => (i.status === "archived" ? { terminal: true } : undefined)}
        rowActions={(i) =>
          i.status === "archived"
            ? []
            : [
                { label: "Copiar digest", icon: Copy, onSelect: () => {} },
                { label: "Descargar SBOM", icon: Download, onSelect: () => {} },
                { label: `Eliminar ${i.name}`, icon: Trash2, onSelect: () => {}, destructive: true },
              ]
        }
        footer={
          <>
            Fila terminal a 0.6 de opacidad + badge outline con icono · orden por columna ·{" "}
            <code className="font-mono">tabular-nums</code> en toda cifra comparable
          </>
        }
        labels={{
          of: (shown, total) => `${shown} de ${total} imágenes`,
          selectedCount: (n) => `${n} seleccionada${n === 1 ? "" : "s"}`,
          clearSelection: "Quitar selección",
          selectAll: "Seleccionar todas las imágenes",
          selectRow: "Seleccionar imagen",
          actions: "Acciones",
        }}
        emptyState={{ title: "Registry vacío", description: "Haz push de tu primera imagen para verla aquí." }}
        noResultsState={{ title: "Sin coincidencias", description: "Ninguna imagen o tag coincide con la búsqueda." }}
      />

      <Card>
        <CardHeader
          actions={
            <span className="inline-flex items-center gap-1.5">
              <StatusBadge status="protected">Protegida</StatusBadge>
              <Badge variant="outline" tone="neutral">público</Badge>
            </span>
          }
        >
          library/nginx
        </CardHeader>
        <CardBody>
          <Tabs defaultValue="pull">
            <TabsList>
              <Tab value="pull">Descargar</Tab>
              <Tab value="tags" count={2}>Tags</Tab>
              <Tab value="detalle">Detalle</Tab>
            </TabsList>
            <TabsPanel value="pull">
              <Stack gap={3}>
                <p className="text-body-sm text-text-secondary">
                  Autentícate con un token de Dokgistry y descarga la imagen por su tag o por digest inmutable.
                </p>
                <CodeBlock language="bash" variant="command" copy filename="terminal" copyLabel="Copiar" copiedLabel="Copiado">
                  docker pull registry.foundathyon.dev/library/nginx:1.27
                </CodeBlock>
                <CodeBlock language="bash" variant="command" copy>
                  docker pull registry.foundathyon.dev/library/nginx@sha256:4a3ed895caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
                </CodeBlock>
              </Stack>
            </TabsPanel>
            <TabsPanel value="tags">
              <CodeBlock
                language="yaml"
                filename="tags.yaml"
                copy
              >{`tags:
  - name: "1.27"
    digest: sha256:4a3ed8…955b46d4
    size: 142 MB
    pushed: 2026-08-20
  - name: latest
    digest: sha256:4a3ed8…955b46d4
    size: 142 MB
    pushed: 2026-08-20`}</CodeBlock>
            </TabsPanel>
            <TabsPanel value="detalle">
              <DescriptionList items={NGINX_FACTS} columns={2} />
            </TabsPanel>
          </Tabs>
        </CardBody>
      </Card>

      <Grid min="16rem" gap={3}>
        <Card>
          <CardHeader>Retención</CardHeader>
          <CardBody>
            <p className="text-body-sm text-text-secondary">Se conservan los últimos 10 tags por repositorio. Los tags sin firmar caducan a los 30 días.</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Replicación</CardHeader>
          <CardBody>
            <p className="text-body-sm text-text-secondary">2 regiones · eu-west-1 (primaria) y us-east-1. Última sincronización hace 6 min.</p>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}
