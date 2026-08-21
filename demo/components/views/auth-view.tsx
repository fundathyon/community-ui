"use client";

import {
  AuthDivider,
  AuthLayout,
  Button,
  Card,
  CardBody,
  CardHeader,
  DeviceItem,
  Grid,
  Link,
  LoginForm,
  MagicLinkForm,
  OAuthProviderButton,
  OAuthProviderGroup,
  OTPForm,
  PageHeader,
  PasskeyButton,
  PermissionMatrix,
  RecoveryCodes,
  RoleBadge,
  ScopeBadge,
  SessionItem,
  SessionList,
  Stack,
  type PermissionMatrixEntry,
} from "@foundathyon/community-ui";
import { es } from "date-fns/locale";

const PERMISSIONS: PermissionMatrixEntry[] = [
  { id: "registry:read", label: <ScopeBadge scope="registry:read" /> },
  { id: "registry:write", label: <ScopeBadge scope="registry:write" /> },
  { id: "registry:delete", label: <ScopeBadge scope="registry:delete" /> },
  { id: "config:read", label: <ScopeBadge scope="config:read" /> },
];

const ROLES: PermissionMatrixEntry[] = [
  { id: "owner", label: <RoleBadge role="owner">Owner</RoleBadge> },
  { id: "admin", label: <RoleBadge role="admin">Admin</RoleBadge> },
  { id: "dev", label: <RoleBadge role="developer">Dev</RoleBadge> },
  { id: "viewer", label: <RoleBadge role="viewer">Viewer</RoleBadge> },
];

const GRANTS: Record<string, Record<string, boolean>> = {
  owner: { "registry:read": true, "registry:write": true, "registry:delete": true, "config:read": true },
  admin: { "registry:read": true, "registry:write": true, "registry:delete": true, "config:read": true },
  dev: { "registry:read": true, "registry:write": true, "registry:delete": false, "config:read": true },
  viewer: { "registry:read": true, "registry:write": false, "registry:delete": false, "config:read": true },
};

const RECOVERY_CODES = [
  "4H2K-9QX7", "PL03-ZZ8A", "7T1M-VV4C", "9RB6-K0DE", "XC72-1WQP",
  "M4N8-3RTU", "0AZ9-LK21", "QW34-88MC", "DF56-7HJK", "23PL-OO9V",
];

export function AuthView() {
  return (
    <Stack gap={8}>
      <PageHeader
        title="Autenticación"
        subtitle="Pantallas §16/§23: inicio de sesión, verificación en dos pasos y seguridad de la cuenta."
      />

      <Grid min="21rem" gap={3}>
        <AuthLayout
          logo={<span className="text-h4 font-semibold text-accent">Foundathyon</span>}
          title="Inicia sesión en Vault"
          subtitle="Gestiona los secretos y la configuración de tu organización."
          footer={
            <span className="text-caption text-text-muted">
              ¿No tienes cuenta? <Link href="#" variant="accent">Solicita acceso</Link>
            </span>
          }
        >
          <LoginForm
            emailLabel="Correo electrónico"
            passwordLabel="Contraseña"
            emailPlaceholder="tu@empresa.com"
            submitLabel="Iniciar sesión"
            loadingLabel="Comprobando…"
            showRemember
            rememberLabel="Recordar este dispositivo"
            forgotPasswordSlot={<Link href="#" variant="accent">¿Olvidaste tu contraseña?</Link>}
            onSubmit={() => {}}
          >
            <AuthDivider label="o continúa con" />
            <OAuthProviderGroup>
              <OAuthProviderButton provider="google" label="Continuar con Google" />
              <OAuthProviderButton provider="github" label="Continuar con GitHub" />
              <PasskeyButton label="Usar una passkey" />
            </OAuthProviderGroup>
          </LoginForm>
        </AuthLayout>

        <Stack gap={3}>
          <Card>
            <CardHeader>Verificación en dos pasos</CardHeader>
            <CardBody>
              <OTPForm
                length={6}
                descriptionSlot={<>Introduce el código de 6 dígitos de tu app de autenticación. Caduca en 9:42.</>}
                resendLabel="Reenviar código"
                cooldownSeconds={30}
                resendCooldownLabel={(s) => `Reenviar en ${s} s`}
                alternativeSlot={<Link href="#" variant="accent">Usar una passkey</Link>}
                onSubmit={() => {}}
                onResend={() => {}}
                codeLabel="Código de verificación"
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Enlace mágico</CardHeader>
            <CardBody>
              <MagicLinkForm
                sent
                emailLabel="Correo electrónico"
                submitLabel="Enviar enlace"
                sentTitle="Revisa tu bandeja de entrada"
                sentSlot={<>Si existe una cuenta con ese correo, te hemos enviado un enlace para entrar sin contraseña.</>}
                resendLabel="Reenviar enlace"
                cooldownSeconds={30}
                resendCooldownLabel={(s) => `Reenviar en ${s} s`}
                onResend={() => {}}
              />
            </CardBody>
          </Card>
        </Stack>
      </Grid>

      <Card>
        <CardHeader>Códigos de recuperación</CardHeader>
        <CardBody>
          <RecoveryCodes
            codes={RECOVERY_CODES}
            markUsed={["7T1M-VV4C", "QW34-88MC"]}
            warningSlot={<>Guárdalos en un lugar seguro. Cada código sirve una sola vez y no volverás a verlos.</>}
            copyAllLabel="Copiar todos"
            copiedLabel="Copiados"
            downloadLabel="Descargar .txt"
            usedLabel="usado"
            onCopyAll={() => {}}
            onDownload={() => {}}
          />
        </CardBody>
      </Card>

      <Grid min="22rem" gap={3}>
        <Card>
          <CardHeader>Sesiones activas</CardHeader>
          <CardBody>
            <SessionList>
              <SessionItem
                device="MacBook Pro · Chrome 128"
                current
                currentLabel="Esta sesión"
                deviceType="desktop"
                ip="88.14.202.7"
                location="Madrid, ES"
                lastActive="2026-08-21T14:55:00Z"
                locale={es}
              />
              <SessionItem
                device="iPhone 15 · Safari"
                deviceType="mobile"
                ip="31.4.180.99"
                location="Barcelona, ES"
                lastActive="2026-08-21T09:12:00Z"
                locale={es}
                onRevoke={() => {}}
                revokeLabel="Cerrar sesión"
              />
            </SessionList>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Inicio de sesión sin reconocer</CardHeader>
          <CardBody>
            <DeviceItem
              device="Dispositivo nuevo · Firefox en Linux"
              browser="Firefox 129"
              ip="185.220.101.44"
              location="Ámsterdam, NL"
              time="2026-08-21T13:40:00Z"
              locale={es}
              recognized={false}
              onReject={() => {}}
              rejectLabel="No fui yo"
              onRecognize={() => {}}
              recognizeLabel="Reconocer dispositivo"
            />
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>Matriz de permisos</CardHeader>
        <CardBody>
          <PermissionMatrix
            permissions={PERMISSIONS}
            roles={ROLES}
            granted={(permissionId, roleId) => GRANTS[roleId]?.[permissionId] ?? false}
            cornerLabel="Permiso"
            caption="Permisos de registry y configuración por rol de la organización."
            labels={{ allowed: "permitido", notAllowed: "no permitido" }}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Scopes y roles</CardHeader>
        <CardBody>
          <Stack gap={3}>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-caption text-text-muted">Scopes:</span>
              <ScopeBadge scope="registry:read" />
              <ScopeBadge scope="registry:write" />
              <ScopeBadge scope="registry:delete" />
              <ScopeBadge scope="config:admin" />
              <ScopeBadge scope="mocky:invoke" />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-caption text-text-muted">Roles:</span>
              <RoleBadge role="owner">Owner</RoleBadge>
              <RoleBadge role="admin">Admin</RoleBadge>
              <RoleBadge role="developer">Developer</RoleBadge>
              <RoleBadge role="viewer">Viewer</RoleBadge>
            </div>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
