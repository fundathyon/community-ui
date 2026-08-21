"use client";

import {
  Card,
  CardBody,
  CardHeader,
  CodeBlock,
  CurlBlock,
  DiffViewer,
  EnvironmentVariables,
  Grid,
  Hash,
  HttpRequest,
  HttpResponse,
  JsonViewer,
  PageHeader,
  Secret,
  Stack,
  Terminal,
  TerminalLine,
  Text,
  YamlViewer,
} from "@foundathyon/community-ui";
import type { ReactNode } from "react";

const USER_RESPONSE = {
  id: "9424bb43-52c7-4c97-a1e2-8f0b7c1d4e5a",
  email: "maria@foundathyon.dev",
  role: "admin",
  provider: "google",
  jwt_secret: "hs256_9f21c0e4a7b3d8f1e6c2",
  created_at: "2026-05-02T08:14:00Z",
  last_active: "2026-08-21T14:52:00Z",
  sessions: [
    { device: "MacBook Pro", ip: "83.44.12.9", current: true },
    { device: "iPhone 17", ip: "83.44.12.9", current: false },
  ],
};

const NODE_SNIPPET = `import { Vault } from "@foundathyon/vault";

const vault = new Vault({ token: process.env.FDN_TOKEN });
const config = await vault.configs.get("prod/api-gateway");
console.log(config.version); // v13`;

const GO_SNIPPET = `client := vault.New(os.Getenv("FDN_TOKEN"))

cfg, err := client.Configs.Get(ctx, "prod/api-gateway")
if err != nil {
    log.Fatal(err)
}
fmt.Println(cfg.Version) // v13`;

const CURL_SNIPPET = `curl -H "Authorization: Bearer $FDN_TOKEN" \\
  https://vault.foundathyon.dev/v1/configs/prod/api-gateway`;

const GATEWAY_YAML = `service: api-gateway
replicas: 4
timeout: 30s
upstreams:
  - configs.foundathyon.dev
  - accounts.foundathyon.dev
jwt_secret: hs256_9f21c0e4a7b3d8f1e6c2`;

function Section({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <CardHeader actions={meta}>{title}</CardHeader>
      <CardBody>
        <Stack gap={4}>{children}</Stack>
      </CardBody>
    </Card>
  );
}

export function DeveloperView() {
  return (
    <Stack gap={6}>
      <PageHeader
        title="Developer UI"
        subtitle="Bloques de código, secretos y respuestas de la API — todo copia el valor completo, nunca la máscara."
      />

      <Section title="Llamar a la API" meta="Vault · v1">
        <CodeBlock
          filename="Leer una config"
          tabsLabel="Lenguaje del ejemplo"
          copy
          tabs={[
            { label: "curl", language: "bash", code: CURL_SNIPPET },
            { label: "node", language: "text", code: NODE_SNIPPET },
            { label: "go", language: "text", code: GO_SNIPPET },
          ]}
        />
        <CodeBlock
          variant="command"
          language="bash"
          copy
          code="docker pull registry.foundathyon.dev/library/nginx:1.27"
        />
      </Section>

      <Section title="Sesión de terminal">
        <Terminal title="~/foundathyon" copy copyLabel="Copiar comandos" copiedLabel="Copiado">
          <TerminalLine kind="input" prompt="$">fdn login --org acme</TerminalLine>
          <TerminalLine kind="output">✓ Autenticado como rafa@foundathyon.dev</TerminalLine>
          <TerminalLine kind="input" prompt="$">fdn vault pull prod/api-gateway</TerminalLine>
          <TerminalLine kind="output">Descargada config v13 · 12 claves · 4,2 KB</TerminalLine>
          <TerminalLine kind="comment"># El secreto jwt_secret llega enmascarado</TerminalLine>
        </Terminal>
        <CurlBlock
          filename="Rotar la config"
          copy
          method="POST"
          url="https://vault.foundathyon.dev/v1/configs/prod/api-gateway/rotate"
          headers={{ Authorization: "Bearer $FDN_TOKEN", "Content-Type": "application/json" }}
          body={{ reason: "rotación programada Q3" }}
        />
      </Section>

      <Section title="Respuesta de la API" meta="GET /v1/users">
        <HttpRequest method="GET" path="/v1/users/9424bb43" status={200} statusText="OK" duration={42} toggleLabel="Ver cabeceras">
          <EnvironmentVariables
            title="Cabeceras de la petición"
            variables={[
              { name: "Authorization", value: "Bearer hs256_9f21c0e4a7b3d8f1e6c2", secret: true },
              { name: "Accept", value: "application/json" },
            ]}
            copy
          />
        </HttpRequest>
        <HttpResponse status={200} statusText="OK" duration={42}>
          <JsonViewer
            label="Cuerpo de la respuesta"
            data={USER_RESPONSE}
            secretKeys={["jwt_secret"]}
            secretLabel="oculto"
            defaultExpandDepth={2}
            copy
          />
        </HttpResponse>
      </Section>

      <Section title="Configuración y cambios">
        <YamlViewer filename="api-gateway.yaml" yaml={GATEWAY_YAML} secretKeys={["jwt_secret"]} copy />
        <DiffViewer
          filename="config.yaml"
          versionFrom="v12"
          versionTo="v13"
          lineNumbers
          before={"service: api-gateway\nreplicas: 2\ntimeout: 30s"}
          after={"service: api-gateway\nreplicas: 4\ntimeout: 30s"}
        />
      </Section>

      <Section title="Secretos, digests y entorno">
        <Grid min="20rem" gap={4}>
          <Stack gap={2}>
            <Text variant="label" tone="secondary">Clave de servicio</Text>
            <Secret value="fdn_live_de96f0c2a1b34d5e6f7089abcdef012345" revealable copy prefix={12} suffix={4} revealLabel="Revelar" />
          </Stack>
          <Stack gap={2}>
            <Text variant="label" tone="secondary">Digest de la imagen</Text>
            <Hash value="sha256:4a3ed8b2c0f9e1a7d5b93f2c6e8140a9c7b1e3f5029d6a8b4c1e7f9012345abcd" truncate copy />
          </Stack>
        </Grid>
        <EnvironmentVariables
          title="production/.env"
          meta="3 variables · 1 secreto"
          copy
          secretLabel="secreto"
          variables={[
            { name: "DATABASE_URL", value: "postgres://db.foundathyon.dev:5432/acme" },
            { name: "LOG_LEVEL", value: "info" },
            { name: "JWT_SECRET", value: "hs256_9f21c0e4a7b3d8f1e6c2", secret: true },
          ]}
        />
      </Section>
    </Stack>
  );
}
