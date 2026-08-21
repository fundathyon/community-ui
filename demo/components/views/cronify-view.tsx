"use client";

import {
  ActivityFeed,
  ActivityFeedItem,
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  Grid,
  PageHeader,
  ResourceHeader,
  Stack,
  StatusBadge,
  type DataTableColumn,
} from "@foundathyon/community-ui";
import { CalendarClock, Pause, Play, RotateCcw } from "lucide-react";

type JobStatus = "healthy" | "processing" | "failed" | "disabled";

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  lastDuration: number;
  status: JobStatus;
  nextRun: string;
}

const STATUS_COPY: Record<JobStatus, string> = {
  healthy: "Completado",
  processing: "En curso",
  failed: "Fallido",
  disabled: "Desactivado",
};

const CRON_DESCRIPTIONS: Record<string, string> = {
  "*/5 * * * *": "Cada 5 minutos",
  "0 */6 * * *": "Cada 6 horas",
  "0 3 * * *": "Todos los días a las 03:00",
  "0 0 * * 1": "Cada lunes a medianoche",
  "0 9 1 * *": "El día 1 de cada mes a las 09:00",
};

function describeCron(expr: string): string {
  return CRON_DESCRIPTIONS[expr] ?? "Programación personalizada";
}

const JOBS: CronJob[] = [
  { id: "job_01", name: "sync-registry-mirror", schedule: "*/5 * * * *", lastDuration: 4200, status: "healthy", nextRun: "2026-08-21T15:00:00Z" },
  { id: "job_02", name: "rotate-vault-secrets", schedule: "0 */6 * * *", lastDuration: 18300, status: "processing", nextRun: "2026-08-21T18:00:00Z" },
  { id: "job_03", name: "nightly-db-backup", schedule: "0 3 * * *", lastDuration: 742000, status: "failed", nextRun: "2026-08-22T03:00:00Z" },
  { id: "job_04", name: "weekly-usage-report", schedule: "0 0 * * 1", lastDuration: 96500, status: "healthy", nextRun: "2026-08-24T00:00:00Z" },
  { id: "job_05", name: "monthly-invoice-run", schedule: "0 9 1 * *", lastDuration: 128000, status: "healthy", nextRun: "2026-09-01T09:00:00Z" },
  { id: "job_06", name: "legacy-cache-warmup", schedule: "0 3 * * *", lastDuration: 5100, status: "disabled", nextRun: "2026-08-22T03:00:00Z" },
];

export function CronifyView() {
  const columns: DataTableColumn<CronJob>[] = [
    { id: "name", header: "Job", type: "text", primary: true, accessor: (j) => j.name, sortable: true },
    { id: "schedule", header: "Programación", type: "cron", accessor: (j) => j.schedule, describe: describeCron },
    { id: "lastDuration", header: "Última duración", type: "duration", accessor: (j) => j.lastDuration, sortable: true, hideBelow: "md" },
    {
      id: "status",
      header: "Estado",
      accessor: (j) => j.status,
      cell: (j) => <StatusBadge status={j.status}>{STATUS_COPY[j.status]}</StatusBadge>,
    },
    { id: "nextRun", header: "Próxima ejecución", type: "relative-date", accessor: (j) => j.nextRun, sortable: true, hideBelow: "lg" },
  ];

  return (
    <Stack gap={8}>
      <PageHeader
        title="Cronify · Jobs"
        subtitle="Tareas programadas de la organización acme: sincronizaciones, backups y reportes."
        actions={<Button variant="primary" leading={<CalendarClock size={14} />}>Nuevo job</Button>}
      />

      <Alert
        tone="danger"
        title="nightly-db-backup falló hace 12 h"
        action={<Button variant="secondary" size="sm" leading={<RotateCcw size={14} />}>Reintentar ahora</Button>}
      >
        Exit code 1 tras 12 min 22 s: el snapshot excedió la ventana de mantenimiento. Los 2 reintentos automáticos también fallaron.
      </Alert>

      <DataTable
        columns={columns}
        data={JOBS}
        rowId={(j) => j.id}
        sorting={{}}
        stickyHeader
        pagination={{ pageSize: 10 }}
        getRowProps={(j) => (j.status === "disabled" ? { terminal: true } : undefined)}
        rowActions={(j) =>
          j.status === "failed"
            ? [
                { label: "Reintentar ahora", icon: RotateCcw, onSelect: () => {} },
                { label: "Ver logs", icon: CalendarClock, onSelect: () => {} },
                { label: `Desactivar ${j.name}`, icon: Pause, onSelect: () => {}, destructive: true },
              ]
            : [
                { label: "Ejecutar ahora", icon: Play, onSelect: () => {} },
                { label: j.status === "disabled" ? "Reactivar" : "Pausar", icon: j.status === "disabled" ? Play : Pause, onSelect: () => {} },
              ]
        }
        emptyState={{ title: "Sin jobs programados", description: "Crea tu primer job para automatizar tareas recurrentes." }}
        noResultsState={{ title: "Sin coincidencias", description: "Ningún job coincide con el filtro." }}
      />

      <ResourceHeader
        title="nightly-db-backup"
        status={<StatusBadge status="failed">Fallido</StatusBadge>}
        meta={[
          "Cron 0 3 * * · Todos los días a las 03:00",
          "Zona horaria Europe/Madrid",
          <span key="next" className="text-text-muted">Próxima ejecución en ~12 h</span>,
        ]}
        actions={
          <span className="inline-flex items-center gap-1.5">
            <Button variant="secondary" leading={<RotateCcw size={14} />}>Reintentar</Button>
            <Button variant="ghost" leading={<Pause size={14} />}>Pausar</Button>
          </span>
        }
      />

      <Grid min="22rem" gap={3}>
        <Card>
          <CardHeader>Ejecuciones recientes</CardHeader>
          <CardBody>
            <ActivityFeed>
              <ActivityFeedItem
                actor={{ system: true }}
                action={<>Ejecución <strong>#1483</strong> falló · exit code 1</>}
                timestamp="2026-08-21T03:12:22Z"
                badge={<StatusBadge status="failed">Fallido</StatusBadge>}
                technical={{ event: "cronify.job.run", traceId: "trace_a91f02cc", requestId: "run_1483" }}
              >
                <p className="text-caption text-text-muted">
                  pg_dump superó la ventana de 12 min. El volumen de snapshot quedó a medio escribir y se descartó.
                </p>
              </ActivityFeedItem>
              <ActivityFeedItem
                actor={{ system: true }}
                action={<>Ejecución <strong>#1482</strong> completada</>}
                timestamp="2026-08-20T03:09:41Z"
                badge={<StatusBadge status="healthy">Completado</StatusBadge>}
                technical={{ event: "cronify.job.run", traceId: "trace_77de10ab", requestId: "run_1482" }}
              />
              <ActivityFeedItem
                actor={{ name: "María Fernández", email: "maria@foundathyon.dev" }}
                action={<>Editó la programación a <strong>0 3 * * *</strong></>}
                timestamp="2026-08-18T11:04:00Z"
                technical={{ event: "cronify.job.update", traceId: "trace_1c2d3e4f", requestId: "req_5567" }}
              />
            </ActivityFeed>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Fiabilidad · 30 días</CardHeader>
          <CardBody>
            <Stack gap={3}>
              <div className="flex items-baseline justify-between">
                <span className="text-body-sm text-text-secondary">Tasa de éxito</span>
                <span className="text-h4 tabular-nums text-text">96,4 %</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-body-sm text-text-secondary">Duración media</span>
                <span className="text-h4 tabular-nums text-text">11 min 38 s</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-body-sm text-text-secondary">Ejecuciones fallidas</span>
                <span className="text-h4 tabular-nums text-danger">3</span>
              </div>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}
