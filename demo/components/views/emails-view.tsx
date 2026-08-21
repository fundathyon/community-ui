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
  emailThemes,
  InvitationEmail,
  NewLoginEmail,
  OtpEmail,
  renderEmail,
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
