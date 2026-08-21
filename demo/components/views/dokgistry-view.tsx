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
} from "@foundathyon/community-ui";
import { Copy, Download, Package, Trash2 } from "lucide-react";
import { useState } from "react";

type ImageStatus = "healthy" | "processing" | "syncing" | "archived";

interface RegistryImage {
  id: string;
  ref: string;
  digest: string;
  size: number;
  status: ImageStatus;
  tags: string[];
  pushed: string;
}

const STATUS_COPY: Record<ImageStatus, string> = {
  healthy: "Disponible",
  processing: "Escaneando",
  syncing: "Replicando",
  archived: "Archivada",
};

const IMAGES: RegistryImage[] = [
  { id: "img_01", ref: "library/nginx", digest: "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4", size: 187_400_192, status: "healthy", tags: ["1.27", "1.27-alpine", "latest"], pushed: "2026-08-20T18:12:00Z" },
  { id: "img_02", ref: "acme/api-gateway", digest: "sha256:9b2c1f4d7e8a0b3c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4", size: 92_274_688, status: "processing", tags: ["2.4.1", "canary"], pushed: "2026-08-21T14:40:00Z" },
  { id: "img_03", ref: "acme/worker", digest: "sha256:f1e2d3c4b5a6978869504132231405f6e7d8c9b0a1928374655647382910aabb", size: 341_902_336, status: "healthy", tags: ["stable", "sha-7f3a2c1"], pushed: "2026-08-19T09:05:00Z" },
  { id: "img_04", ref: "library/postgres", digest: "sha256:0c9e8d7b6a5f4e3d2c1b0a99887766554433221100ffeeddccbbaa9988776655", size: 438_304_768, status: "syncing", tags: ["16.4"], pushed: "2026-08-18T22:30:00Z" },
  { id: "img_05", ref: "acme/legacy-billing", digest: "sha256:deadbeefcafef00d1234567890abcdef1234567890abcdefdeadbeefcafef00d1", size: 512_000_000, status: "archived", tags: ["0.9-eol"], pushed: "2025-11-02T11:00:00Z" },
];

const NGINX_FACTS = [
  { label: "Digest", value: "sha256:a3ed95…955b46d4", mono: true },
  { label: "Arquitecturas", value: "linux/amd64 · linux/arm64" },
  { label: "Capas", value: "6 · 187 MB comprimido" },
  { label: "Firma", value: "cosign · verificada", mono: false },
];

export function DokgistryView() {
  const [query, setQuery] = useState("");

  const columns: DataTableColumn<RegistryImage>[] = [
    { id: "ref", header: "Imagen", type: "text", primary: true, accessor: (i) => i.ref, sortable: true },
    { id: "digest", header: "Digest", type: "digest", accessor: (i) => i.digest, hideBelow: "md" },
    { id: "size", header: "Tamaño", type: "bytes", accessor: (i) => i.size, sortable: true },
    {
      id: "status",
      header: "Estado",
      accessor: (i) => i.status,
      cell: (i) => <StatusBadge status={i.status}>{STATUS_COPY[i.status]}</StatusBadge>,
    },
    { id: "tags", header: "Tags", type: "tags", accessor: (i) => i.tags, hideBelow: "lg" },
    { id: "pushed", header: "Subida", type: "relative-date", accessor: (i) => i.pushed, sortable: true, hideBelow: "lg" },
  ];

  return (
    <Stack gap={8}>
      <PageHeader
        title="Dokgistry · Repositorios"
        subtitle="Registry privado de imágenes de contenedor de la organización acme."
        actions={<Button variant="primary" leading={<Package size={14} />}>Nuevo repositorio</Button>}
        toolbar={
          <SearchInput
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar imagen o tag…"
            shortcutHint="/"
            className="max-w-xs"
          />
        }
      />

      <Banner tone="warning" action={<Button variant="ghost" size="sm">Ver uso por repositorio</Button>}>
        Almacenamiento al 89 % (445 GB de 500 GB). Elimina tags sin referencias antes de que se bloqueen los push.
      </Banner>

      <DataTable
        columns={columns}
        data={IMAGES}
        rowId={(i) => i.id}
        globalFilter={query}
        sorting={{}}
        stickyHeader
        pagination={{ pageSize: 10 }}
        getRowProps={(i) => (i.status === "archived" ? { terminal: true } : undefined)}
        rowActions={(i) => [
          { label: "Copiar digest", icon: Copy, onSelect: () => {} },
          { label: "Descargar SBOM", icon: Download, onSelect: () => {} },
          { label: `Archivar ${i.ref}`, icon: Trash2, onSelect: () => {}, destructive: true },
        ]}
        emptyState={{ title: "Registry vacío", description: "Haz push de tu primera imagen para verla aquí." }}
        noResultsState={{ title: "Sin coincidencias", description: "Ninguna imagen o tag coincide con la búsqueda." }}
      />

      <Card>
        <CardHeader
          actions={
            <span className="inline-flex items-center gap-1.5">
              <StatusBadge status="healthy">Disponible</StatusBadge>
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
              <Tab value="tags" count={3}>Tags</Tab>
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
                  docker pull registry.foundathyon.dev/library/nginx@sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
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
    digest: sha256:a3ed95…955b46d4
    size: 187 MB
    pushed: 2026-08-20
  - name: "1.27-alpine"
    digest: sha256:71c4b2…0af3e9
    size: 41 MB
    pushed: 2026-08-20
  - name: latest
    digest: sha256:a3ed95…955b46d4
    size: 187 MB
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
