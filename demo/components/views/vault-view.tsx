"use client";

import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  ConfirmDialog,
  DangerZone,
  DangerZoneAction,
  DataTable,
  ErrorState,
  Grid,
  PageHeader,
  ResourceContent,
  ResourceHeader,
  ResourcePage,
  ResourceTabs,
  SaveBar,
  Select,
  SettingsRow,
  Stack,
  StatusBadge,
  Switch,
  type DataTableColumn,
  type SensitivityLevel,
} from "@foundathyon/community-ui";
import { History, KeyRound, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

type VaultStatus = "protected" | "active" | "expiring" | "syncing" | "expired";

interface VaultConfig {
  id: string;
  name: string;
  env: "production" | "staging" | "preview";
  version: string;
  sensitivity: SensitivityLevel;
  status: VaultStatus;
  expiresAt: string;
}

const STATUS_COPY: Record<VaultStatus, string> = {
  protected: "Protegida",
  active: "Activa",
  expiring: "Caduca pronto",
  syncing: "Sincronizando",
  expired: "Caducada",
};

const CONFIGS: VaultConfig[] = [
  { id: "cfg_01", name: "api-keys.yaml", env: "production", version: "v42", sensitivity: "secret", status: "protected", expiresAt: "2026-08-23T09:00:00Z" },
  { id: "cfg_02", name: "database-url.env", env: "production", version: "v18", sensitivity: "secret", status: "active", expiresAt: "2026-11-02T00:00:00Z" },
  { id: "cfg_03", name: "stripe-webhook.json", env: "staging", version: "v7", sensitivity: "sensitive", status: "expiring", expiresAt: "2026-08-26T12:00:00Z" },
  { id: "cfg_04", name: "feature-flags.yaml", env: "preview", version: "v91", sensitivity: "private", status: "syncing", expiresAt: "2027-01-15T00:00:00Z" },
  { id: "cfg_05", name: "smtp-relay.env", env: "staging", version: "v3", sensitivity: "sensitive", status: "active", expiresAt: "2026-12-01T00:00:00Z" },
  { id: "cfg_06", name: "legacy-oauth.json", env: "production", version: "v1", sensitivity: "secret", status: "expired", expiresAt: "2026-07-30T00:00:00Z" },
];

export function VaultView() {
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState(2);

  const columns: DataTableColumn<VaultConfig>[] = [
    { id: "name", header: "Configuración", type: "text", primary: true, accessor: (c) => c.name, sortable: true },
    {
      id: "env",
      header: "Entorno",
      accessor: (c) => c.env,
      sortable: true,
      cell: (c) => (
        <Badge variant={c.env === "production" ? "tonal" : "outline"} tone={c.env === "production" ? "danger" : "neutral"} dot>
          {c.env}
        </Badge>
      ),
    },
    { id: "version", header: "Versión", type: "version", accessor: (c) => c.version, align: "left", hideBelow: "md" },
    { id: "sensitivity", header: "Acceso", type: "sensitivity", accessor: (c) => c.sensitivity, sortable: true },
    {
      id: "status",
      header: "Estado",
      accessor: (c) => c.status,
      cell: (c) => <StatusBadge status={c.status}>{STATUS_COPY[c.status]}</StatusBadge>,
    },
    { id: "expiresAt", header: "Expira", type: "relative-date", accessor: (c) => c.expiresAt, sortable: true, hideBelow: "lg" },
  ];

  return (
    <Stack gap={8}>
      <PageHeader
        title="Vault · Configuraciones"
        subtitle="Secretos y configuración versionada de la organización acme, cifrados en reposo."
        actions={<Button variant="primary" leading={<KeyRound size={14} />}>Nueva configuración</Button>}
      />

      <DataTable
        columns={columns}
        data={CONFIGS}
        rowId={(c) => c.id}
        sorting={{}}
        stickyHeader
        pagination={{ pageSize: 10 }}
        getRowProps={(c) => (c.status === "expired" ? { terminal: true } : undefined)}
        rowActions={(c) => [
          { label: "Ver versiones", icon: History, onSelect: () => {} },
          { label: "Rotar secreto", icon: RotateCcw, onSelect: () => {} },
          { label: `Revocar ${c.name}`, icon: Trash2, onSelect: () => {}, destructive: true },
        ]}
        emptyState={{ title: "Sin configuraciones", description: "Crea la primera configuración cifrada de la organización." }}
        noResultsState={{ title: "Sin coincidencias", description: "Ajusta el término de búsqueda o el filtro de entorno." }}
      />

      <ResourcePage>
        <ResourceHeader
          breadcrumb={<Breadcrumb items={[{ label: "Vault", href: "#" }, { label: "production", href: "#" }, { label: "api-keys.yaml" }]} />}
          title="api-keys.yaml"
          status={<StatusBadge status="protected">Protegida</StatusBadge>}
          meta={[
            "Creada el 2 may 2026",
            "Último uso hace 3 h · pipeline ci-deploy",
            <span key="exp" className="text-warning">Caduca en 2 días</span>,
          ]}
          actions={<Button variant="secondary" leading={<RotateCcw size={14} />}>Rotar</Button>}
        />
        <ResourceTabs
          defaultValue="resumen"
          tabs={[
            {
              value: "resumen",
              label: "Resumen",
              content: (
                <ResourceContent>
                  <Card>
                    <CardHeader>Detalle</CardHeader>
                    <CardBody>
                      <p className="text-body-sm text-text-secondary">
                        Clave de servicio para el registry privado y la API de facturación. Consumida por 4 pipelines y 2 workers.
                        La rotación programada emite el nuevo valor sin cortar los consumidores durante la ventana de solapamiento.
                      </p>
                    </CardBody>
                  </Card>
                  <DangerZone title="Zona peligrosa">
                    <DangerZoneAction
                      title="Revocar esta clave"
                      description="Los pipelines y workers que la usan recibirán 401 en la siguiente petición. La acción es inmediata y no se puede deshacer."
                      action={
                        <ConfirmDialog
                          trigger={<Button variant="destructive-subtle" leading={<Trash2 size={14} />}>Revocar clave</Button>}
                          title="Revocar api-keys.yaml"
                          description="api-keys.yaml quedará inservible de inmediato. 4 pipelines y 2 workers empezarán a recibir 401. No se puede deshacer."
                          verb="Revocar clave"
                          confirmText="api-keys.yaml"
                          confirmPrompt={<>Escribe <b>api-keys.yaml</b> para confirmar</>}
                          cancelLabel="Cancelar"
                          onConfirm={() => {}}
                        />
                      }
                    />
                  </DangerZone>
                </ResourceContent>
              ),
            },
            {
              value: "config",
              label: "Configuración",
              content: (
                <ResourceContent>
                  <Card>
                    <CardHeader>Rotación y acceso</CardHeader>
                    <CardBody>
                      <Stack gap={1.5}>
                        <SettingsRow
                          label="Política de rotación"
                          description="Cada cuánto se emite un valor nuevo automáticamente."
                          control={
                            <Select
                              aria-label="Política de rotación"
                              defaultValue="90d"
                              items={[
                                { value: "30d", label: "Cada 30 días" },
                                { value: "90d", label: "Cada 90 días" },
                                { value: "manual", label: "Manual" },
                              ]}
                            />
                          }
                        />
                        <SettingsRow
                          label="Entorno de destino"
                          description="Dónde se inyecta el secreto en el arranque."
                          control={
                            <Select
                              aria-label="Entorno de destino"
                              defaultValue="production"
                              items={[
                                { value: "production", label: "Production" },
                                { value: "staging", label: "Staging" },
                                { value: "preview", label: "Preview" },
                              ]}
                            />
                          }
                        />
                        <SettingsRow
                          label="Auditar cada lectura"
                          description="Registra un evento por cada consumo del secreto."
                          control={<Switch label="Auditar lecturas" defaultChecked onCheckedChange={() => setChanges((n) => n + 1)} />}
                        />
                      </Stack>
                      <SaveBar
                        count={changes}
                        countLabel={(n) => `${n} cambios sin guardar`}
                        saving={saving}
                        discardLabel="Descartar"
                        saveLabel="Guardar cambios"
                        onDiscard={() => setChanges(0)}
                        onSave={() => {
                          setSaving(true);
                          setChanges(0);
                        }}
                      />
                    </CardBody>
                  </Card>
                </ResourceContent>
              ),
            },
            {
              value: "actividad",
              label: "Actividad",
              content: (
                <ResourceContent>
                  <ErrorState
                    title="No tienes acceso a la actividad de esta clave"
                    description="El registro de auditoría de secretos secret requiere el rol Owner o el permiso vault:audit:read. Solicita acceso a un administrador de la organización."
                    details={{ status: "403 Forbidden", requestId: "req_9f2a71c4", traceId: "trace_bb0417de", timestamp: "2026-08-21T14:56:03Z" }}
                    retry={{ label: "Solicitar acceso", onClick: () => {} }}
                    copyLabel="Copiar detalles"
                  />
                </ResourceContent>
              ),
            },
          ]}
        />
      </ResourcePage>

      <Grid min="18rem" gap={3}>
        <Card>
          <CardHeader>Cifrado</CardHeader>
          <CardBody>
            <p className="text-body-sm text-text-secondary">AES-256-GCM · claves gestionadas por KMS · rotación de la clave maestra cada 24 h.</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Consumidores</CardHeader>
          <CardBody>
            <p className="text-body-sm text-text-secondary">4 pipelines de Cronify · 2 workers · 1 función serverless leen esta configuración.</p>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}
