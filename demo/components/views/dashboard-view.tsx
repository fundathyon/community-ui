"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  MetricCard,
  PageHeader,
  Stack,
  StatCard,
  Timeline,
  TimelineItem,
} from "@foundathyon/community-ui";
import {
  AreaChart,
  ChartCard,
  DonutChart,
  LineChart,
  Sparkline,
} from "@foundathyon/community-ui/charts";
import { useDemoProduct } from "../demo-providers";

const logins = [
  { x: "00:00", y: 320 },
  { x: "04:00", y: 210 },
  { x: "08:00", y: 640 },
  { x: "12:00", y: 980 },
  { x: "16:00", y: 870 },
  { x: "20:00", y: 540 },
  { x: "now", y: 610 },
];

const errorSeries = [
  { name: "Correctos", data: logins.map((p) => ({ x: p.x, y: p.y })), color: "success" as const },
  {
    name: "Fallidos",
    data: logins.map((p) => ({ x: p.x, y: Math.round(p.y * 0.04) })),
    color: "danger" as const,
  },
];

const providers = [
  { name: "Email + contraseña", value: 62 },
  { name: "Google", value: 24 },
  { name: "WebAuthn / passkey", value: 11 },
  { name: "Magic link", value: 3 },
];

export function DashboardView() {
  const { product } = useDemoProduct();
  return (
    <Stack gap={6}>
      <PageHeader
        title="Vista general"
        subtitle={`Organización acme · producto ${product} · actualizado hace 30 s`}
        actions={<Button variant="secondary">Exportar CSV</Button>}
      />

      <Alert tone="warning" title="Almacenamiento al 89 %" action={<Button variant="ghost">Ver uso por repositorio</Button>}>
        Elimina tags sin referencias o amplía el volumen antes de que se bloqueen los push.
      </Alert>

      <Grid min="15rem" gap={3}>
        <MetricCard
          label="Logins · 24 h"
          value="8 412"
          delta={{ value: "+12 % vs ayer", direction: "up", positive: true }}
          visual={<Sparkline data={logins} label="Logins 24h" height={36} />}
        />
        <StatCard
          label="Tasa de error"
          value="1,8 %"
          delta={{ value: "+0,6 pp", direction: "up", positive: false }}
          context="objetivo < 2 %"
        />
        <StatCard label="Latencia p95" value="142 ms" delta={{ value: "estable", direction: "flat" }} context="objetivo < 200 ms" />
        <StatCard
          label="Sesiones activas"
          value="1 204"
          delta={{ value: "+38", direction: "up", positive: true }}
          context="312 dispositivos únicos"
        />
      </Grid>

      <Grid min="22rem" gap={3}>
        <ChartCard title="Intentos de autenticación · 24 h">
          <AreaChart series={errorSeries} label="Intentos de autenticación en 24 horas" height={200} />
        </ChartCard>
        <ChartCard title="Distribución por provider">
          <DonutChart variant="list" segments={providers} label="Distribución de logins por provider" />
        </ChartCard>
      </Grid>

      <Grid min="22rem" gap={3}>
        <Card>
          <CardHeader>Peticiones por día</CardHeader>
          <CardBody>
            <LineChart
              series={[{ name: "Pulls", data: logins.map((p) => ({ x: p.x, y: p.y * 3 })) }]}
              label="Peticiones por día"
              summary="Tendencia estable con pico al mediodía"
              height={180}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Actividad reciente</CardHeader>
          <CardBody>
            <Timeline>
              <TimelineItem marker={{ status: "active" }} title="Token ci-deploy creado" meta="hace 2 h · maría@foundathyon.dev" />
              <TimelineItem marker={{ status: "revoked" }} title="Enlace compartido revocado" meta="hace 5 h · sistema · expiración alcanzada" />
              <TimelineItem marker={{ status: "syncing" }} title="Registry sincronizado" meta="ayer, 03:00 · 128 repositorios" />
            </Timeline>
          </CardBody>
        </Card>
      </Grid>

      <div className="flex items-center gap-2 text-caption text-text-muted">
        Estado de los servicios:
        <Badge tone="success" dot>Accounts API 99,98 %</Badge>
        <Badge tone="success" dot>Vault API 99,95 %</Badge>
        <Badge tone="warning" dot>Dokgistry storage 97,10 %</Badge>
      </div>
    </Stack>
  );
}
