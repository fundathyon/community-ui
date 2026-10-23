// Documentation UI (§26) — the complete kit for building a product's docs site:
// layout frame, navigation, search, content blocks and API reference. Docs share
// every token with the app but invert one decision — panel density becomes
// reading density (72ch measure, 1.7 line-height, 14px body). See docs-page.tsx.
//
// Reuse over duplication (a hard rule): code/HTTP/JSON come from the dev domain,
// Tabs/Breadcrumb from navigation, Select/SearchInput from forms, Drawer from
// overlays. This barrel adds only what is docs-specific.
// ── Layout ──────────────────────────────────────────────────────────────────
export { DocsLayout, DocsSidebarTrigger } from "./docs-layout";
export { DocsHeader } from "./docs-header";
export { DocsSidebar, DocsSidebarSection, DocsSidebarItem, DocsSidebarGroup, } from "./docs-sidebar";
export { DocsBreadcrumb } from "./docs-breadcrumb";
export { TableOfContents } from "./table-of-contents";
export { DocsSearch } from "./docs-search";
export { VersionSelector } from "./version-selector";
export { ProductSelector } from "./product-selector";
export { DocsPagination } from "./docs-pagination";
export { DocsSection } from "./docs-section";
export { DocsPage, DocsProse, DOCS_PROSE_CLASS } from "./docs-page";
// ── Content blocks ──────────────────────────────────────────────────────────
export { Admonition, Note, Tip, Warning, Danger, Important, Aside, } from "./admonition";
export { Example } from "./example";
export { Steps, Step } from "./steps";
export { DocsTabs } from "./docs-tabs";
export { Expandable } from "./expandable";
export { Blockquote } from "./blockquote";
// ── API reference ───────────────────────────────────────────────────────────
export { ApiEndpoint } from "./api-endpoint";
export { VersionBadge, DeprecationNotice, } from "./version-badge";
export { ApiParameters } from "./api-parameters";
export { ApiRequest } from "./api-request";
export { ApiResponse } from "./api-response";
export { ApiSchema, PropertyTable, EnumTable, } from "./api-schema";
