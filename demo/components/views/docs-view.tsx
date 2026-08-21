"use client";

import { CodeBlock, Heading, JsonViewer, Text } from "@foundathyon/community-ui";
import {
  ApiEndpoint,
  ApiParameters,
  ApiResponse,
  Danger,
  DocsPage,
  DocsPagination,
  DocsProse,
  DocsSection,
  Example,
  Important,
  Note,
  Step,
  Steps,
  TableOfContents,
  Tip,
  Warning,
  type TocItem,
} from "@foundathyon/community-ui/docs";

const TOC: TocItem[] = [
  { id: "introduccion", label: "Introducción", depth: 2 },
  { id: "instalacion", label: "Conectar un registry", depth: 2 },
  { id: "ejemplo", label: "Ejemplo", depth: 2 },
  { id: "notas", label: "Notas y avisos", depth: 2 },
  { id: "api", label: "Referencia de la API", depth: 2 },
];

const USERS_RESPONSE = {
  data: [
    { id: "9424bb43", email: "maria@foundathyon.dev", role: "admin", jwt_secret: "hs256_9f21c0e4" },
    { id: "abd034dd", email: "rafa@foundathyon.dev", role: "operator", jwt_secret: "hs256_1a7d5b93" },
  ],
  next_cursor: "eyJvZmZzZXQiOjIwfQ",
};

export function DocsView() {
  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1">
        <DocsPage
          title="Primeros pasos con Vault"
          description="Guarda configuraciones y secretos, conéctalos a tus servicios y rótalos sin downtime."
          pagination={
            <DocsPagination
              prev={{ label: "Introducción a Foundathyon", href: "#" }}
              next={{ label: "Autenticación y tokens", href: "#" }}
              previousLabel="Anterior"
              nextLabel="Siguiente"
              label="Navegación entre páginas"
            />
          }
        >
          <DocsSection id="introduccion" heading="Introducción" copyLinkLabel="Copiar enlace" copiedLabel="Copiado">
            <p>
              Vault es el almacén de configuraciones y secretos de Foundathyon. Cada config se versiona, se audita y se
              entrega a tus servicios con el secreto enmascarado salvo en el momento de la creación.
            </p>
            <Important title="Un solo origen de verdad">
              Nunca copies un secreto a un archivo <code>.env</code> sin cifrar: referencia la config de Vault y deja que
              el runtime la resuelva.
            </Important>
          </DocsSection>

          <DocsSection id="instalacion" heading="Conectar un registry" copyLinkLabel="Copiar enlace" copiedLabel="Copiado">
            <p>Tres pasos para dejar tu primer servicio leyendo de Vault:</p>
            <Steps>
              <Step title="Instala la CLI">
                <CodeBlock variant="command" language="bash" copy code="npm install -g @foundathyon/cli" />
              </Step>
              <Step title="Autentícate en tu organización">
                <CodeBlock variant="command" language="bash" copy code="fdn login --org acme" />
              </Step>
              <Step title="Conecta el registry y descarga la config">
                <CodeBlock
                  variant="command"
                  language="bash"
                  copy
                  code={"fdn registry connect registry.foundathyon.dev\nfdn vault pull prod/api-gateway"}
                />
              </Step>
            </Steps>
            <Tip>Puedes automatizar estos pasos en CI con un token de servicio de sólo lectura.</Tip>
          </DocsSection>

          <DocsSection id="ejemplo" heading="Ejemplo" copyLinkLabel="Copiar enlace" copiedLabel="Copiado">
            <p>La misma config, vista como preview renderizada o como su fuente JSON:</p>
            <Example
              label="Ejemplo"
              title="Config prod/api-gateway"
              previewLabel="Vista"
              codeLabel="Fuente"
              code={
                <CodeBlock
                  language="json"
                  copy
                  code={'{\n  "service": "api-gateway",\n  "replicas": 4,\n  "timeout": "30s"\n}'}
                />
              }
            >
              <DocsProse>
                <Heading level={3} visual="h5">
                  prod/api-gateway
                </Heading>
                <Text variant="body-sm" tone="secondary">
                  4 réplicas · timeout 30 s · versión v13
                </Text>
              </DocsProse>
            </Example>
          </DocsSection>

          <DocsSection id="notas" heading="Notas y avisos" copyLinkLabel="Copiar enlace" copiedLabel="Copiado">
            <Note>Las configuraciones se versionan automáticamente en cada guardado; puedes revertir a cualquier versión.</Note>
            <Warning>Rotar un secreto invalida las sesiones que aún usen el valor anterior.</Warning>
            <Danger>Eliminar una config es permanente: sus versiones y su historial de auditoría desaparecen.</Danger>
          </DocsSection>

          <DocsSection id="api" heading="Referencia de la API" copyLinkLabel="Copiar enlace" copiedLabel="Copiado">
            <ApiEndpoint method="GET" path="/v1/users" description="Lista los usuarios de la organización, paginados por cursor.">
              <ApiParameters
                requiredLabel="obligatorio"
                headers={{ name: "Parámetro", type: "Tipo", description: "Descripción" }}
                groupLabels={{ path: "Ruta", query: "Query", header: "Cabeceras" }}
                defaultLabel="Por defecto"
                params={[
                  { name: "org_id", type: "string", in: "path", required: true, description: "Identificador de la organización." },
                  { name: "limit", type: "integer", in: "query", default: "20", description: "Número máximo de resultados (1–100)." },
                  { name: "cursor", type: "string", in: "query", description: "Cursor de la página siguiente." },
                  { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer con un token de servicio." },
                ]}
              />
              <ApiResponse status={200} statusText="OK" title="Respuesta">
                <JsonViewer data={USERS_RESPONSE} secretKeys={["jwt_secret"]} secretLabel="oculto" defaultExpandDepth={3} copy />
              </ApiResponse>
            </ApiEndpoint>
          </DocsSection>
        </DocsPage>
      </div>

      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-6">
          <TableOfContents items={TOC} label="En esta página" followScroll />
        </div>
      </aside>
    </div>
  );
}
