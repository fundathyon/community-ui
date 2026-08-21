"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Grid,
  PageHeader,
  Stack,
  type Product,
} from "@foundathyon/community-ui";
import {
  AccountLockedEmail,
  ApiKeyCreatedEmail,
  ApiKeyRevokedEmail,
  emailThemes,
  GenericInvitationEmail,
  InvitationEmail,
  JobCompletedEmail,
  JobFailedEmail,
  NewDeviceEmail,
  NewLoginEmail,
  OtpEmail,
  renderEmail,
  ResourceSharedEmail,
  SecurityAlertEmail,
  type EmailTheme,
} from "@foundathyon/community-ui/email";
import { useMemo } from "react";
import { useDemoProduct } from "../demo-providers";

const PRODUCT_META: Record<Product, { name: string; address: string }> = {
  vault: { name: "Vault", address: "Foundathyon · Gran Vía 1, 28013 Madrid" },
  dokgistry: { name: "Dokgistry", address: "Foundathyon · Gran Vía 1, 28013 Madrid" },
  accounts: { name: "Accounts", address: "Foundathyon · Gran Vía 1, 28013 Madrid" },
  cronify: { name: "Cronify", address: "Foundathyon · Gran Vía 1, 28013 Madrid" },
  mocky: { name: "Mocky", address: "Foundathyon · Gran Vía 1, 28013 Madrid" },
};

const SWITCHER: Product[] = ["vault", "dokgistry", "accounts", "cronify"];

function themeFor(product: Product): EmailTheme {
  return {
    ...emailThemes[product],
    productName: PRODUCT_META[product].name,
    address: PRODUCT_META[product].address,
    baseUrl: "https://foundathyon.dev",
    footerLinks: [
      { label: "Privacidad", href: "https://foundathyon.dev/privacy" },
      { label: "Seguridad", href: "https://foundathyon.dev/security" },
      { label: "Documentación", href: "https://foundathyon.dev/docs" },
    ],
  };
}

export function EmailsView() {
  const { product, setProduct } = useDemoProduct();

  const previews = useMemo(() => {
    const theme = themeFor(product);
    const brand = PRODUCT_META[product].name;
    return [
      {
        key: "otp",
        title: "Código de verificación (OTP)",
        caption: "accounts.auth.otp · enviado al iniciar sesión",
        html: renderEmail(
          <OtpEmail
            theme={theme}
            greeting="Hola Rafa,"
            code="482 193"
            expiresMinutes={10}
            requestContext={{ device: "Chrome en macOS", ip: "88.14.202.7" }}
            heading="Tu código de acceso"
            body="Introduce este código para completar el inicio de sesión. No lo compartas con nadie."
            expiresText="El código caduca en 10 minutos."
            securityNote="Si no has solicitado este código, ignora este correo y cambia tu contraseña."
            labels={{ device: "Dispositivo", ip: "IP" }}
          />,
        ),
      },
      {
        key: "invitation",
        title: "Invitación a una organización",
        caption: "accounts.org.invite · rol admin",
        html: renderEmail(
          <InvitationEmail
            theme={theme}
            greeting="Hola,"
            inviterName="María Fernández"
            inviterEmail="maria@foundathyon.dev"
            organizationName="acme"
            role="admin"
            acceptUrl="https://accounts.foundathyon.dev/invite/9f2a71c4de"
            expiresDays={7}
            heading={`Únete a acme en ${brand}`}
            body="María Fernández te ha invitado a colaborar en la organización acme con el rol de administrador."
            ctaLabel="Aceptar invitación"
            expiresText="La invitación caduca en 7 días."
            fallbackLabel="O copia este enlace en tu navegador:"
          />,
        ),
      },
      {
        key: "new-login",
        title: "Nuevo inicio de sesión",
        caption: "accounts.auth.new_login · tono warning",
        html: renderEmail(
          <NewLoginEmail
            theme={theme}
            greeting="Hola Rafa,"
            device="Linux"
            browser="Firefox 129"
            ip="185.220.101.44"
            location="Ámsterdam, NL"
            time="21 ago 2026, 13:40 UTC"
            reviewUrl="https://accounts.foundathyon.dev/security/sessions"
            wasMeHint="Si has sido tú, no necesitas hacer nada."
            heading="Nuevo inicio de sesión en tu cuenta"
            body="Hemos detectado un inicio de sesión desde un dispositivo que no reconocemos."
            actionLabel="Revisar actividad"
            alertTitle="Nuevo inicio de sesión"
            headerMeta="Seguridad"
            labels={{ device: "Dispositivo", browser: "Navegador", ip: "IP", location: "Ubicación", time: "Fecha" }}
          />,
        ),
      },
      {
        key: "security-alert",
        title: "Alerta de seguridad",
        caption: "vault.key.revoke · tono danger",
        html: renderEmail(
          <SecurityAlertEmail
            theme={theme}
            greeting="Hola Rafa,"
            eventTitle="Clave de API revocada"
            eventDescription="La clave api-keys.yaml se ha revocado. Los servicios que la usaban empezarán a recibir 401."
            details={[
              { label: "Evento", value: "vault.key.revoke" },
              { label: "Clave", value: "api-keys.yaml" },
              { label: "IP", value: "88.14.202.7" },
              { label: "Fecha", value: "21 ago 2026, 14:56 UTC" },
            ]}
            actionUrl="https://accounts.foundathyon.dev/security/events"
            actionLabel="Revisar evento"
            heading="Alerta de seguridad"
            headerMeta="Seguridad"
            securityNote="Si has sido tú, no necesitas hacer nada. Si no, protege tu cuenta ahora."
          />,
        ),
      },
      {
        key: "account-locked",
        title: "Cuenta bloqueada",
        caption: "accounts.auth.lockout · 5 intentos fallidos",
        html: renderEmail(
          <AccountLockedEmail
            theme={theme}
            greeting="Hola Rafa,"
            attempts={5}
            unlockMinutes={15}
            ip="203.0.113.44"
            heading="Cuenta bloqueada"
            body="Tu cuenta se ha bloqueado tras varios intentos de inicio de sesión fallidos."
            actionUrl="https://accounts.foundathyon.dev/recover"
            ctaLabel="Restablecer contraseña"
            headerMeta="Seguridad"
            securityNote="Si no has sido tú, restablece tu contraseña en cuanto se levante el bloqueo."
            labels={{ attempts: "Intentos fallidos", ip: "IP", unlock: "Se desbloquea" }}
          />,
        ),
      },
      {
        key: "new-device",
        title: "Dispositivo nuevo",
        caption: "accounts.auth.new_device · sin reconocer",
        html: renderEmail(
          <NewDeviceEmail
            theme={theme}
            greeting="Hola Rafa,"
            deviceName="Firefox en Linux"
            ip="203.0.113.44"
            location="ubicación desconocida"
            time="21 ago 2026, 09:14 UTC"
            trustUrl="https://accounts.foundathyon.dev/security/devices/trust"
            reportUrl="https://accounts.foundathyon.dev/security/devices/report"
            heading="Dispositivo nuevo en tu cuenta"
            body="Se ha accedido a tu cuenta desde un dispositivo que no reconocemos."
            trustLabel="Confiar en este dispositivo"
            reportLabel="No he sido yo"
            alertTitle="Dispositivo nuevo detectado"
            headerMeta="Seguridad"
            wasMeHint="Si has sido tú, no hace falta hacer nada — el dispositivo queda reconocido."
            labels={{ device: "Dispositivo", ip: "IP", location: "Ubicación", time: "Fecha" }}
          />,
        ),
      },
      {
        key: "generic-invitation",
        title: "Invitación a un recurso",
        caption: "vault.share.invite · acceso a production/api-keys.yaml",
        html: renderEmail(
          <GenericInvitationEmail
            theme={theme}
            greeting="Hola,"
            inviterName="María Fernández"
            inviterEmail="maria@foundathyon.dev"
            targetName="production/api-keys.yaml"
            role="lectura"
            access={[{ label: "Vault", value: "leer configs de production" }]}
            acceptUrl="https://accounts.foundathyon.dev/invite/4a7f2e91c4"
            declineUrl="https://accounts.foundathyon.dev/invite/4a7f2e91c4/decline"
            expiresDays={7}
            ctaLabel="Aceptar invitación"
            declineLabel="Rechazar"
            fallbackLabel="O copia este enlace en tu navegador:"
          />,
        ),
      },
      {
        key: "api-key-created",
        title: "Clave de API creada",
        caption: "vault.key.create · ci-deploy",
        html: renderEmail(
          <ApiKeyCreatedEmail
            theme={theme}
            greeting="Hola Rafa,"
            keyName="ci-deploy"
            scopes={["registry:read", "registry:write"]}
            creatorName="María Fernández"
            createdAt="7 ago 2026, 14:45 UTC"
            heading="Clave de API creada"
            actionUrl="https://accounts.foundathyon.dev/security/api-keys"
            ctaLabel="Gestionar claves de API"
            securityNote="Si no has creado esta clave, revócala y contacta con soporte de inmediato."
            labels={{ scopes: "Scopes", creator: "Creada por", createdAt: "Creada" }}
          />,
        ),
      },
      {
        key: "api-key-revoked",
        title: "Clave de API revocada",
        caption: "vault.key.revoke · ci-deploy",
        html: renderEmail(
          <ApiKeyRevokedEmail
            theme={theme}
            greeting="Hola Rafa,"
            keyName="ci-deploy"
            revokerName="Rafa"
            revokedAt="21 ago 2026, 14:56 UTC"
            heading="Clave de API revocada"
            consequence="Los pipelines que la usen empezarán a recibir 401 en menos de 30 s."
            actionUrl="https://accounts.foundathyon.dev/security/api-keys"
            ctaLabel="Gestionar claves de API"
            note="Si no esperabas esto, contacta con el administrador de tu organización."
          />,
        ),
      },
      {
        key: "resource-shared",
        title: "Recurso compartido",
        caption: "vault.share.create · production/api-keys.yaml",
        html: renderEmail(
          <ResourceSharedEmail
            theme={theme}
            greeting="Hola,"
            resourceName="production/api-keys.yaml"
            resourceType="config"
            sharerName="María Fernández"
            sharerEmail="maria@foundathyon.dev"
            shareUrl="https://vault.foundathyon.dev/share/9f2a71c4de"
            expiresAt="En 7 días"
            ctaLabel="Abrir config"
            securityNote="Si no esperabas esto, ignora este mensaje."
            labels={{ sharedBy: "Compartido por", expires: "Expira" }}
          />,
        ),
      },
      {
        key: "job-failed",
        title: "Job fallido",
        caption: "cronify.job.failed · rotate-credentials",
        html: renderEmail(
          <JobFailedEmail
            theme={theme}
            greeting="Hola Rafa,"
            jobName="rotate-credentials"
            schedule="0 3 1 * *"
            reason="El job agotó el tiempo de espera al conectar con el proveedor de credenciales tras 30 s."
            exitInfo="exit 1"
            failedAt="21 ago 2026, 03:00 UTC"
            heading="Job fallido"
            retryUrl="https://cronify.foundathyon.dev/jobs/rotate-credentials"
            ctaLabel="Reintentar job"
            retryNote="Corrige el problema y reintenta el job, o espera a la próxima ejecución programada."
            labels={{ schedule: "Programación", exitInfo: "Salida", failedAt: "Falló" }}
          />,
        ),
      },
      {
        key: "job-completed",
        title: "Job completado",
        caption: "cronify.job.completed · cleanup-orphans (bajo demanda)",
        html: renderEmail(
          <JobCompletedEmail
            theme={theme}
            greeting="Hola Rafa,"
            jobName="cleanup-orphans"
            schedule="0 */6 * * *"
            completedAt="21 ago 2026, 06:00 UTC"
            duration="1 m 42 s"
            body="Se eliminaron 23 tags sin referencias."
            heading="Job completado"
            actionUrl="https://cronify.foundathyon.dev/jobs/cleanup-orphans"
            ctaLabel="Ver job"
          />,
        ),
      },
    ];
  }, [product]);

  return (
    <Stack gap={8}>
      <PageHeader
        title="Emails transaccionales"
        subtitle="Plantillas §27 renderizadas con renderEmail() a HTML estático. Cambia de producto para ver el acento."
        actions={
          <ButtonGroup label="Producto de la plantilla">
            {SWITCHER.map((p) => (
              <Button
                key={p}
                variant={p === product ? "primary" : "secondary"}
                size="sm"
                onClick={() => setProduct(p)}
              >
                {PRODUCT_META[p].name}
              </Button>
            ))}
          </ButtonGroup>
        }
      />

      <Card>
        <CardBody>
          <p className="text-body-sm text-text-secondary">
            Estos correos se renderizan con <code className="text-code">renderEmail(&lt;Plantilla /&gt;)</code> a una cadena HTML con
            estilos en línea y layout de tablas — el payload exacto que se entrega al proveedor de correo. Cada vista previa se
            muestra dentro de un <code className="text-code">iframe</code> aislado, tal y como se vería en la bandeja de entrada.
          </p>
        </CardBody>
      </Card>

      <Grid min="24rem" gap={3}>
        {previews.map((p) => (
          <Card key={p.key}>
            <CardHeader>{p.title}</CardHeader>
            <CardBody>
              <Stack gap={2}>
                <span className="text-caption text-text-muted">{p.caption}</span>
                <iframe
                  srcDoc={p.html}
                  className="w-full h-[520px] rounded-lg border border-border"
                  title={p.title}
                />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
