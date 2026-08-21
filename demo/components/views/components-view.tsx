"use client";

import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  ConfirmDialog,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Grid,
  IconButton,
  Inline,
  Kbd,
  PageHeader,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  Skeleton,
  SkeletonGroup,
  Stack,
  StatusBadge,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Text,
  Timeline,
  TimelineItem,
  Tooltip,
  useToast,
  type StatusKey,
} from "@foundathyon/community-ui";
import {
  ChevronDown,
  Copy,
  Filter,
  KeyRound,
  Package,
  PlusCircle,
  RefreshCw,
  Shield,
  Tags,
  Trash2,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const STATUSES: { status: StatusKey; label: string }[] = [
  { status: "active", label: "Activo" },
  { status: "healthy", label: "Saludable" },
  { status: "protected", label: "Protegido" },
  { status: "pending", label: "Pendiente" },
  { status: "processing", label: "Procesando" },
  { status: "syncing", label: "Sincronizando" },
  { status: "draft", label: "Borrador" },
  { status: "degraded", label: "Degradado" },
  { status: "expiring", label: "Por expirar" },
  { status: "locked", label: "Bloqueado" },
  { status: "failed", label: "Fallido" },
  { status: "expired", label: "Expirado" },
  { status: "revoked", label: "Revocado" },
  { status: "disabled", label: "Deshabilitado" },
  { status: "archived", label: "Archivado" },
  { status: "unknown", label: "Desconocido" },
];

function Section({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Stack gap={4}>{children}</Stack>
      </CardBody>
    </Card>
  );
}

export function ComponentsView() {
  const { toast, undo } = useToast();
  const [page, setPage] = useState(3);

  return (
    <Stack gap={6}>
      <PageHeader
        title="Componentes"
        subtitle="Galería viva del design system: acciones, estados, overlays y navegación con copy de Foundathyon."
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="secondary" trailing={<ChevronDown size={14} />}>Acciones del repositorio</Button>}
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem icon={Copy} onClick={() => toast({ title: "Comando copiado al portapapeles", tone: "success" })}>
                Copiar comando pull
              </DropdownMenuItem>
              <DropdownMenuItem icon={Shield} onClick={() => toast({ title: "Repositorio protegido", tone: "success" })}>
                Proteger
              </DropdownMenuItem>
              <DropdownMenuItem icon={Tags} shortcut="⌘T" onClick={() => toast({ title: "Mostrando 12 tags" })}>
                Ver tags
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                icon={Trash2}
                destructive
                onClick={() => toast({ title: "Confirma la eliminación en el diálogo", tone: "warning" })}
              >
                Eliminar repositorio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <Section title="Botones">
        <Inline gap={2} wrap>
          <Button variant="primary">Guardar cambios</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Ver detalle</Button>
          <Button variant="destructive">Eliminar</Button>
          <Button variant="destructive-subtle">Revocar</Button>
        </Inline>
        <Inline gap={2} wrap align="center">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
        </Inline>
        <Inline gap={2} wrap align="center">
          <Button variant="primary" leading={<PlusCircle size={14} />}>Nuevo token</Button>
          <Button variant="secondary" loading>Sincronizando</Button>
          <Button variant="secondary" disabled>Sin permisos</Button>
          <Tooltip content="Vuelve a leer el estado desde el registry">
            <Button variant="ghost" leading={<RefreshCw size={14} />}>Refrescar</Button>
          </Tooltip>
          <IconButton icon={Copy} label="Copiar digest" variant="ghost" />
          <IconButton icon={Trash2} label="Eliminar tag" variant="destructive-subtle" />
        </Inline>
      </Section>

      <Section title="Insignias y taxonomía de estados">
        <Inline gap={2} wrap align="center">
          <Badge tone="success" dot>Operativo</Badge>
          <Badge tone="warning" variant="tonal">Uso alto</Badge>
          <Badge tone="danger" variant="outline">Caído</Badge>
          <Badge tone="info" variant="solid">Beta</Badge>
          <Badge variant="counter" tone="neutral">128</Badge>
        </Inline>
        <Inline gap={2} wrap align="center">
          {STATUSES.map(({ status, label }) => (
            <StatusBadge key={status} status={status}>
              {label}
            </StatusBadge>
          ))}
        </Inline>
      </Section>

      <Section title="Alertas y banners">
        <Banner
          tone="warning"
          action={<Button variant="ghost">Ampliar plan</Button>}
          onDismiss={() => toast({ title: "Banner descartado" })}
          dismissLabel="Descartar aviso"
        >
          Tu plan Community caduca en 5 días. Amplía antes de que se pausen los jobs de Cronify.
        </Banner>
        <Alert tone="info" title="Rotación de claves programada" action={<Button variant="ghost">Ver calendario</Button>}>
          Las claves de servicio se rotarán automáticamente el 1 de septiembre a las 03:00 UTC.
        </Alert>
        <Alert tone="success" title="Registry sincronizado" onDismiss={() => {}}>
          128 repositorios y 1 204 tags al día con el mirror de origen.
        </Alert>
        <Alert tone="warning" title="Almacenamiento al 89 %">
          Elimina tags sin referencias o amplía el volumen antes de que se bloqueen los push.
        </Alert>
        <Alert tone="danger" title="Fallo de verificación de firma">
          La imagen library/nginx:1.27 no supera la política cosign. Se ha bloqueado el despliegue.
        </Alert>
      </Section>

      <Section title="Identidad">
        <Inline gap={4} wrap align="center">
          <Avatar name="María Fernández" size={40} presence="online" />
          <Avatar name="Rafael Zamora" size={32} />
          <Avatar name="ci-deploy" identifier="svc-ci-deploy" size={24} />
          <AvatarGroup max={3} size={32}>
            <Avatar name="María Fernández" size={32} />
            <Avatar name="Rafael Zamora" size={32} />
            <Avatar name="Oswaldo Ríos" size={32} />
            <Avatar name="Nuria Prat" size={32} />
            <Avatar name="Invitado" size={32} />
          </AvatarGroup>
          <Tooltip content="Cuenta de servicio, sin sesión interactiva">
            <Badge tone="neutral" variant="outline">svc · ci-deploy</Badge>
          </Tooltip>
        </Inline>
      </Section>

      <Section title="Overlays y confirmaciones">
        <Inline gap={2} wrap align="center">
          <Dialog>
            <DialogTrigger render={<Button variant="primary">Nuevo enlace compartido</Button>} />
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Nuevo enlace compartido</DialogTitle>
                <DialogDescription>Cualquiera con el enlace podrá leer esta config en modo solo lectura.</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Text variant="body-sm" tone="secondary">
                  El enlace hereda los permisos de la config <Text as="span" variant="code">prod/api-gateway</Text> y caduca en 7 días.
                </Text>
              </DialogBody>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost">Cancelar</Button>} />
                <DialogClose
                  render={
                    <Button variant="primary" onClick={() => toast({ title: "Enlace generado", tone: "success" })}>
                      Generar enlace
                    </Button>
                  }
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger render={<Button variant="secondary" leading={<Package size={14} />}>Detalle del tag</Button>} />
            <DrawerContent size="md">
              <DrawerHeader>
                <DrawerTitle>library/nginx:1.27</DrawerTitle>
                <DrawerDescription>sha256:4a3ed8b2…c0f9 · 42,1 MB · linux/amd64</DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <Stack gap={3}>
                  <Text variant="body-sm" tone="secondary">Publicado hace 3 días por ci-deploy. Firmado con cosign, política verificada.</Text>
                  <Timeline>
                    <TimelineItem marker={{ status: "active" }} title="Push aceptado" meta="hace 3 d · ci-deploy" />
                    <TimelineItem marker={{ status: "protected" }} title="Firma verificada" meta="hace 3 d · cosign" />
                  </Timeline>
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose render={<Button variant="ghost">Cerrar</Button>} />
                <Button variant="primary" onClick={() => toast({ title: "Tag protegido contra borrado", tone: "success" })}>
                  Proteger tag
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Popover>
            <PopoverTrigger render={<Button variant="ghost" leading={<Filter size={14} />}>Filtrar por estado</Button>} />
            <PopoverContent align="start">
              <Stack gap={2}>
                <PopoverTitle>Filtrar por estado</PopoverTitle>
                <Checkbox label="Activos" defaultChecked />
                <Checkbox label="Por expirar" />
                <Checkbox label="Revocados" />
              </Stack>
            </PopoverContent>
          </Popover>

          <ConfirmDialog
            trigger={<Button variant="destructive-subtle" leading={<KeyRound size={14} />}>Revocar clave</Button>}
            title="Revocar clave de API"
            description={
              <>
                La clave <Text as="span" variant="code">sk_live_de96</Text> dejará de funcionar de inmediato en todos los
                servicios. Esta acción no se puede deshacer.
              </>
            }
            verb="Revocar clave"
            tone="danger"
            confirmText="sk_live_de96"
            confirmPrompt={
              <>
                Escribe <Text as="span" variant="code">sk_live_de96</Text> para confirmar
              </>
            }
            cancelLabel="Cancelar"
            onConfirm={() => {
              toast({ title: "Clave revocada", description: "sk_live_de96 ya no es válida.", tone: "danger" });
            }}
          />
        </Inline>
      </Section>

      <Section title="Navegación">
        <Tabs defaultValue="overview">
          <TabsList>
            <Tab value="overview">Resumen</Tab>
            <Tab value="tags" count={12}>Tags</Tab>
            <Tab value="activity">Actividad</Tab>
          </TabsList>
          <TabsPanel value="overview">
            <Text variant="body-sm" tone="secondary" className="pt-3">
              Repositorio privado con 12 tags. Mirror activo desde registry.foundathyon.dev.
            </Text>
          </TabsPanel>
          <TabsPanel value="tags">
            <Text variant="body-sm" tone="secondary" className="pt-3">12 tags, 3 protegidos contra borrado.</Text>
          </TabsPanel>
          <TabsPanel value="activity">
            <Text variant="body-sm" tone="secondary" className="pt-3">Último push hace 3 días por ci-deploy.</Text>
          </TabsPanel>
        </Tabs>
        <Pagination page={page} pageCount={7} onPageChange={setPage} rangeLabel="41–60 de 128 tags" />
      </Section>

      <Section title="Progreso y carga">
        <Progress value={68} label="Subiendo capas · 5 de 7" />
        <Progress value={92} label="Cuota de almacenamiento" tone="warning" />
        <Progress value={null} label="Reindexando el registry…" />
        <SkeletonGroup label="Cargando repositorios">
          <Stack gap={2}>
            <Skeleton variant="text" lines={2} />
            <Inline gap={2} align="center">
              <Skeleton variant="circle" className="size-8" />
              <Skeleton variant="rect" className="h-8 w-48" />
            </Inline>
          </Stack>
        </SkeletonGroup>
      </Section>

      <Section title="Contenido vacío y secundario">
        <Grid min="18rem" gap={3}>
          <EmptyState
            icon={Package}
            title="Aún no hay repositorios"
            description="Haz tu primer push a registry.foundathyon.dev para verlo aquí."
            action={<Button variant="primary" onClick={() => toast({ title: "Comando pull copiado", tone: "success" })}>Copiar comando push</Button>}
            secondaryAction={<Button variant="ghost">Ver documentación</Button>}
          />
          <EmptyState
            kind="no-results"
            title="Sin resultados"
            description="Ningún tag coincide con “arm64”. Prueba con otro término."
            action={<Button variant="secondary" onClick={() => undo({ title: "Filtros limpiados", onUndo: () => {}, undoLabel: "Deshacer" })}>Limpiar filtros</Button>}
          />
        </Grid>
        <Accordion
          items={[
            {
              value: "protegidos",
              title: "¿Qué significa un tag protegido?",
              content: (
                <Text variant="body-sm" tone="secondary">
                  Un tag protegido no puede sobrescribirse ni eliminarse mientras la protección esté activa. Ideal para releases.
                </Text>
              ),
            },
            {
              value: "webhooks",
              title: "¿Cómo notifico un push a Cronify?",
              content: (
                <Text variant="body-sm" tone="secondary">
                  Configura un webhook en Ajustes → Integraciones apuntando al endpoint del job. Se dispara en cada push aceptado.
                </Text>
              ),
            },
            {
              value: "retencion",
              title: "¿Cuánto se retienen los tags sin referencia?",
              content: (
                <Text variant="body-sm" tone="secondary">
                  30 días por defecto. Pasado ese plazo, el recolector de basura los elimina en la ventana de mantenimiento.
                </Text>
              ),
            },
          ]}
        />
        <Text variant="caption" tone="muted">
          Atajo global de la paleta de comandos: <Kbd>⌘K</Kbd>
        </Text>
      </Section>
    </Stack>
  );
}
