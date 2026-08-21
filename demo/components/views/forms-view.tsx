"use client";

import {
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  FileUpload,
  FormActions,
  FormField,
  FormSection,
  Grid,
  Input,
  MultiSelect,
  NumberInput,
  OTPInput,
  PageHeader,
  PasswordInput,
  Radio,
  RadioGroup,
  SearchInput,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
  type FileUploadValue,
} from "@foundathyon/community-ui";
import { useState, type FormEvent } from "react";

const IMAGES = [
  { value: "nginx", label: "library/nginx" },
  { value: "redis", label: "library/redis" },
  { value: "postgres", label: "library/postgres" },
  { value: "node", label: "library/node" },
  { value: "alpine", label: "library/alpine" },
  { value: "grafana", label: "grafana/grafana" },
];

const SCOPES = [
  { value: "read", label: "read", description: "Descargar imágenes y configs" },
  { value: "write", label: "write", description: "Publicar nuevas versiones" },
  { value: "delete", label: "delete", description: "Eliminar tags y recursos" },
  { value: "admin", label: "admin", description: "Gestionar miembros y políticas" },
];

export function FormsView() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<string | null>("nginx");
  const [scopes, setScopes] = useState<string[]>(["read"]);
  const [expiry, setExpiry] = useState<Date | null>(new Date(Date.now() + 7 * 86_400_000));
  const [retention, setRetention] = useState(30);
  const [configFile, setConfigFile] = useState<FileUploadValue | null>(null);

  // Fake upload driver: FileUpload never touches the network itself, so the
  // consumer pushes status/progress back in — this mirrors a real fetch/XHR
  // progress handler. Triggered directly from the change handler (not a
  // status-watching effect) so it runs exactly once per queued file,
  // including re-queues from Retry.
  function handleConfigFileChange(next: FileUploadValue | null) {
    setConfigFile(next);
    if (next?.status !== "queued") return;
    const { file } = next;
    setConfigFile({ file, status: "uploading", progress: 0 });
    let progress = 0;
    const timer = setInterval(() => {
      progress += 18;
      if (progress >= 100) {
        clearInterval(timer);
        setConfigFile((current) => (current?.file === file ? { ...current, status: "done", progress: 100 } : current));
        return;
      }
      setConfigFile((current) => (current?.file === file ? { ...current, progress } : current));
    }, 300);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast({ title: "Enlace compartido creado", description: "Válido durante 7 días.", tone: "success" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={6}>
        <PageHeader
          title="Crear enlace compartido"
          subtitle="Comparte una config o un repositorio con permisos acotados y caducidad."
          toolbar={
            <SearchInput
              value={query}
              onValueChange={setQuery}
              placeholder="Buscar recurso a compartir…"
              shortcutHint="/"
              className="max-w-xs"
            />
          }
        />

        <FormSection title="Detalles del enlace" description="Cómo se identifica y quién puede usarlo.">
          <FormField
            label="Nombre del enlace"
            description="Aparecerá en el registro de auditoría de la organización."
            validate={(value) =>
              typeof value === "string" && value.trim().length > 0 && value.trim().length < 3
                ? "Usa al menos 3 caracteres."
                : null
            }
          >
            <Input name="linkName" placeholder="prod-solo-lectura" defaultValue="prod-solo-lectura" />
          </FormField>

          <FormField
            label="Dominio permitido"
            description="Restringe el acceso a un dominio de correo."
            error="Este dominio ya tiene un enlace activo (409 Conflict)."
          >
            <Input name="domain" defaultValue="foundathyon.dev" invalid leading={<Text as="span" variant="code">@</Text>} />
          </FormField>

          <FormField label="Config adjunta" description="Se adjunta al enlace tal cual — sin procesar en el servidor.">
            <FileUpload
              value={configFile}
              onValueChange={handleConfigFileChange}
              accept=".yaml,.yml,.json,.env"
              maxSize={2 * 1024 * 1024}
              prompt="Arrastra un archivo o búscalo"
              hint="YAML, JSON o .env · hasta 2 MB"
              actionLabel={(action, fileName) =>
                action === "retry" ? `Reintentar ${fileName}` : `Quitar ${fileName}`
              }
            />
          </FormField>

          <Grid min="16rem" gap={4}>
            <FormField label="Rol asignado" description="Define qué puede hacer quien reciba el enlace.">
              <Select
                defaultValue="operador"
                items={[
                  { value: "admin", label: "Administrador", description: "Control total del recurso" },
                  { value: "operador", label: "Operador", description: "Gestiona recursos, no miembros" },
                  { value: "lectura", label: "Sólo lectura", description: "Ver y descargar" },
                ]}
              />
            </FormField>

            <FormField
              label="Contraseña opcional"
              description="Refuerza el enlace con una contraseña de un solo uso."
              validate={(value) =>
                typeof value === "string" && value.length > 0 && value.length < 8
                  ? "Mínimo 8 caracteres."
                  : null
              }
            >
              <PasswordInput
                name="password"
                placeholder="••••••••"
                showPasswordLabel="Mostrar contraseña"
                hidePasswordLabel="Ocultar contraseña"
              />
            </FormField>
          </Grid>
        </FormSection>

        <FormSection title="Alcance y permisos" description="Qué recurso se comparte y con qué scopes.">
          <FormField label="Imagen base" description="Busca en el registry conforme escribes.">
            <Combobox
              items={IMAGES}
              value={image}
              onValueChange={setImage}
              placeholder="Buscar imagen…"
              empty="Sin resultados"
              triggerLabel="Abrir lista de imágenes"
            />
          </FormField>

          <FormField label="Scopes concedidos" description="Selecciona uno o varios permisos.">
            <MultiSelect
              items={SCOPES}
              value={scopes}
              onValueChange={setScopes}
              placeholder="Añadir scope…"
              empty="Sin resultados"
              removeLabel={(label) => `Quitar ${label}`}
              triggerLabel="Abrir lista de scopes"
            />
          </FormField>

          <FormField label="Visibilidad">
            <RadioGroup defaultValue="privado">
              <Stack gap={2}>
                <Radio value="privado" label="Privado" description="Solo miembros de la organización" />
                <Radio value="enlace" label="Con enlace" description="Cualquiera que tenga el enlace" />
                <Radio value="publico" label="Público" description="Visible en el índice público de Dokgistry" />
              </Stack>
            </RadioGroup>
          </FormField>

          <Checkbox
            label="Notificar por email al crear el enlace"
            description="Se avisará a los administradores de la organización."
            defaultChecked
          />
        </FormSection>

        <FormSection title="Caducidad y límites" description="Cuándo deja de funcionar y cuántas veces puede usarse.">
          <Grid min="16rem" gap={4}>
            <FormField label="Caducidad" description="Se resuelve a una fecha absoluta bajo el control.">
              <DatePicker
                value={expiry}
                onValueChange={setExpiry}
                openCalendarLabel="Abrir calendario"
                presets={[
                  { label: "En 24 horas", value: new Date(Date.now() + 86_400_000) },
                  { label: "En 7 días", value: new Date(Date.now() + 7 * 86_400_000) },
                  { label: "En 30 días", value: new Date(Date.now() + 30 * 86_400_000) },
                  { label: "Nunca", value: null },
                ]}
              />
            </FormField>

            <FormField label="Máximo de usos" description="0 = sin límite.">
              <NumberInput
                defaultValue={10}
                min={0}
                max={1000}
                decrementLabel="Reducir"
                incrementLabel="Aumentar"
              />
            </FormField>
          </Grid>

          <FormField label="Retención de auditoría" description="Días que se conservan los eventos de este enlace.">
            <Slider value={retention} onValueChange={setRetention} min={1} max={90} step={1} unit="días" valueLabel="Días de retención" />
          </FormField>
        </FormSection>

        <FormSection
          title="Confirmación y notas"
          description="Verifica con un código y deja constancia del motivo."
          actions={
            <Button
              type="button"
              variant="secondary"
              onClick={() => toast({ title: "Sección guardada", tone: "success" })}
            >
              Guardar sección
            </Button>
          }
        >
          <FormField label="Código de verificación" description="Introduce el código enviado a tu dispositivo.">
            <OTPInput
              length={6}
              onComplete={() => toast({ title: "Código verificado", tone: "success" })}
            />
          </FormField>

          <FormField label="Nota interna" description="Contexto para el registro de auditoría.">
            <Textarea
              name="note"
              rows={3}
              maxLength={280}
              placeholder="Enlace para la auditoría externa de seguridad del Q3…"
            />
          </FormField>

          <Switch label="Revocar automáticamente al caducar" description="El enlace se invalida en cuanto se alcanza la fecha." defaultChecked />
          <Switch label="Permitir descarga de capas" description="Aplica de inmediato, sin guardar." />
        </FormSection>

        <FormActions leading={<Text variant="body-sm" tone="secondary">Los cambios se aplican al crear el enlace.</Text>}>
          <Button type="button" variant="ghost">Cancelar</Button>
          <Button type="submit" variant="primary">Crear enlace</Button>
        </FormActions>
      </Stack>
    </form>
  );
}
