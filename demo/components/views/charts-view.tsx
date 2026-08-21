"use client";

import { Button, Grid, MetricCard, PageHeader, Stack, StatCard } from "@foundathyon/community-ui";
import {
  AreaChart,
  BarChart,
  ChartCard,
  ChartToolbar,
  DonutChart,
  Heatmap,
  LineChart,
  ProgressChart,
  Sparkline,
  TimelineChart,
  TimeRangePicker,
  type ChartPoint,
  type HeatmapCell,
} from "@foundathyon/community-ui/charts";
import { useState } from "react";

const logins: ChartPoint[] = [
  { x: "00:00", y: 320 },
  { x: "04:00", y: 210 },
  { x: "08:00", y: 640 },
  { x: "12:00", y: 980 },
  { x: "16:00", y: 870 },
  { x: "20:00", y: 540 },
  { x: "23:59", y: 610 },
];

const authAttempts = [
  { name: "Correctos", data: logins.map((p) => ({ x: p.x, y: p.y })), color: "success" as const },
  { name: "Fallidos", data: logins.map((p) => ({ x: p.x, y: Math.round((p.y ?? 0) * 0.05) })), color: "danger" as const },
];

const pullsPerDay = [
  {
    name: "Pulls",
    data: [
      { x: "Lun", y: 1240 },
      { x: "Mar", y: 1580 },
      { x: "Mié", y: 1720 },
      { x: "Jue", y: 1490 },
      { x: "Vie", y: 2010 },
      { x: "Sáb", y: 640 },
      { x: "Dom", y: 520 },
    ],
  },
];

const providers = [
  { name: "Email + contraseña", value: 62 },
  { name: "Google", value: 24 },
  { name: "WebAuthn / passkey", value: 11 },
  { name: "Magic link", value: 3 },
];

const errorSpark: ChartPoint[] = [
  { x: 1, y: 2.4 },
  { x: 2, y: 2.1 },
  { x: 3, y: 1.9 },
  { x: 4, y: 2.2 },
  { x: 5, y: 1.8 },
];
const latencySpark: ChartPoint[] = [
  { x: 1, y: 138 },
  { x: 2, y: 145 },
  { x: 3, y: 142 },
  { x: 4, y: 150 },
  { x: 5, y: 142 },
];

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const HOURS = ["00", "04", "08", "12", "16", "20"];
const heatData: HeatmapCell[] = DAYS.flatMap((day, di) =>
  HOURS.map((hour, hi) => {
    const business = hi === 3 ? 900 : hi === 2 || hi === 4 ? 640 : 180;
    const weekend = di >= 5 ? 0.35 : 1;
    return { x: hour, y: day, value: Math.round(business * weekend + hi * 12) };
  }),
);

const now = Date.now();
const DAY = 86_400_000;
const uptime = [
  { start: new Date(now - 90 * DAY), end: new Date(now - 31 * DAY), status: "up" as const },
  { start: new Date(now - 31 * DAY), end: new Date(now - 30 * DAY), status: "degraded" as const },
  { start: new Date(now - 30 * DAY), end: new Date(now - 12 * DAY), status: "up" as const },
  { start: new Date(now - 12 * DAY), end: new Date(now - 12 * DAY + DAY / 4), status: "down" as const },
  { start: new Date(now - 12 * DAY + DAY / 4), end: new Date(now), status: "up" as const },
];

export function ChartsView() {
  const [range, setRange] = useState("24h");
  const [failing, setFailing] = useState(true);

  return (
    <Stack gap={6}>
      <PageHeader
        title="Visualización"
        subtitle="Dashboard operativo: autenticación, almacenamiento y disponibilidad de la suite."
      />

      <ChartToolbar title="Vista general" meta="Actualizado hace 30 s">
        <TimeRangePicker value={range} onChange={setRange} label="Rango de tiempo" />
      </ChartToolbar>

      <Grid min="15rem" gap={3}>
        <MetricCard
          label="Logins · 24 h"
          value="8 412"
          delta={{ value: "+12 % vs ayer", direction: "up", positive: true }}
          visual={<Sparkline data={logins} label="Logins 24h" height={36} area />}
        />
        <MetricCard
          label="Tasa de error"
          value="1,8 %"
          delta={{ value: "-0,6 pp", direction: "down", positive: true }}
          visual={<Sparkline data={errorSpark} color="danger" label="Tasa de error" height={36} />}
        />
        <MetricCard
          label="Latencia p95"
          value="142 ms"
          delta={{ value: "estable", direction: "flat" }}
          visual={<Sparkline data={latencySpark} color="info" label="Latencia p95" height={36} />}
        />
        <StatCard
          label="Pulls · 7 d"
          value="9 200"
          delta={{ value: "+8 % vs semana previa", direction: "up", positive: true }}
          context="pico el viernes"
        />
      </Grid>

      <Grid min="22rem" gap={3}>
        <ChartCard title="Logins · 24 h" toolbar={<TimeRangePicker value={range} onChange={setRange} />}>
          <LineChart series={[{ name: "Logins", data: logins }]} label="Logins en las últimas 24 horas" summary="Pico al mediodía, valle de madrugada" height={200} />
        </ChartCard>
        <ChartCard title="Intentos de autenticación">
          <AreaChart series={authAttempts} stacked label="Intentos de autenticación correctos y fallidos" height={200} />
        </ChartCard>
      </Grid>

      <Grid min="22rem" gap={3}>
        <ChartCard title="Pulls por día">
          <BarChart series={pullsPerDay} label="Pulls del registry por día de la semana" height={200} />
        </ChartCard>
        <ChartCard title="Logins por provider">
          <DonutChart variant="list" segments={providers} label="Distribución de logins por provider" />
        </ChartCard>
      </Grid>

      <Grid min="22rem" gap={3}>
        <ChartCard title="Distribución de almacenamiento">
          <DonutChart
            variant="donut"
            segments={[
              { name: "Imágenes", value: 280 },
              { name: "Configs", value: 90 },
              { name: "Backups", value: 42 },
            ]}
            centerLabel="412 GB"
            label="Almacenamiento por tipo de recurso"
            valueFormat={(v) => `${v} GB`}
          />
        </ChartCard>
        <ChartCard title="Cuota de almacenamiento">
          <ProgressChart
            value={412}
            max={500}
            label="Cuota de almacenamiento usada"
            summary="412 GB de 500 GB"
            valueFormat={(v) => `${v} GB`}
            thresholds={[
              { value: 450, tone: "warning", label: "Aviso" },
              { value: 500, tone: "danger", label: "Límite" },
            ]}
          />
        </ChartCard>
      </Grid>

      <ChartCard title="Actividad por hora y día">
        <Heatmap
          data={heatData}
          xLabels={HOURS}
          yLabels={DAYS}
          label="Actividad de la suite por hora del día y día de la semana"
          summary="Concentración en horario laboral entre semana"
          valueFormat={(v) => `${v} eventos`}
        />
      </ChartCard>

      <ChartCard title="Disponibilidad · 90 días">
        <TimelineChart
          segments={uptime}
          label="Disponibilidad de la API en los últimos 90 días"
          availabilityLabel="99,98 %"
          startCaption="hace 90 d"
          endCaption="hoy"
          statusLabels={{ up: "Operativo", degraded: "Degradado", down: "Caído", unknown: "Sin datos" }}
        />
      </ChartCard>

      <Grid min="20rem" gap={3}>
        <ChartCard title="Cargando">
          <LineChart series={[]} state="loading" label="Cargando métrica" height={160} />
        </ChartCard>
        <ChartCard title="Sin datos">
          <BarChart series={[]} state="empty" emptyLabel="Sin datos en este intervalo" label="Métrica sin datos" height={160} />
        </ChartCard>
        <ChartCard title="Error de carga">
          <AreaChart
            series={[]}
            state={failing ? "error" : undefined}
            onRetry={() => setFailing(false)}
            errorTitle="No se pudieron cargar los datos"
            errorDescription="El servicio de métricas no respondió a tiempo."
            retryLabel="Reintentar"
            label="Métrica con error"
            height={160}
          />
        </ChartCard>
      </Grid>

      <Button variant="ghost" onClick={() => setFailing(true)} className="self-start">
        Reiniciar el estado de error
      </Button>
    </Stack>
  );
}
