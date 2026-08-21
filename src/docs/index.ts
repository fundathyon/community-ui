// Documentation UI (§26) — the complete kit for building a product's docs site:
// layout frame, navigation, search, content blocks and API reference. Docs share
// every token with the app but invert one decision — panel density becomes
// reading density (72ch measure, 1.7 line-height, 14px body). See docs-page.tsx.
//
// Reuse over duplication (a hard rule): code/HTTP/JSON come from the dev domain,
// Tabs/Breadcrumb from navigation, Select/SearchInput from forms, Drawer from
// overlays. This barrel adds only what is docs-specific.

// ── Layout ──────────────────────────────────────────────────────────────────
export { DocsLayout, DocsSidebarTrigger, type DocsLayoutProps, type DocsSidebarTriggerProps } from "./docs-layout";
export { DocsHeader, type DocsHeaderProps } from "./docs-header";
export {
  DocsSidebar,
  DocsSidebarSection,
  DocsSidebarItem,
  DocsSidebarGroup,
  type DocsSidebarProps,
  type DocsSidebarSectionProps,
  type DocsSidebarItemProps,
  type DocsSidebarGroupProps,
} from "./docs-sidebar";
export { DocsBreadcrumb, type DocsBreadcrumbProps } from "./docs-breadcrumb";
export { TableOfContents, type TableOfContentsProps, type TocItem } from "./table-of-contents";
export { DocsSearch, type DocsSearchProps, type DocsSearchResult } from "./docs-search";
export { VersionSelector, type VersionSelectorProps, type DocsVersion } from "./version-selector";
export { ProductSelector, type ProductSelectorProps, type DocsProduct } from "./product-selector";
export { DocsPagination, type DocsPaginationProps, type DocsPaginationLink } from "./docs-pagination";
export { DocsSection, type DocsSectionProps } from "./docs-section";
export { DocsPage, DocsProse, DOCS_PROSE_CLASS, type DocsPageProps, type DocsProseProps } from "./docs-page";

// ── Content blocks ──────────────────────────────────────────────────────────
export {
  Admonition,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
  type AdmonitionProps,
  type AdmonitionKind,
} from "./admonition";
export { Example, type ExampleProps } from "./example";
export { Steps, Step, type StepsProps, type StepProps } from "./steps";
export { DocsTabs, type DocsTabsProps, type DocsTabsItem } from "./docs-tabs";
export { Expandable, type ExpandableProps } from "./expandable";
export { Blockquote, type BlockquoteProps } from "./blockquote";

// ── API reference ───────────────────────────────────────────────────────────
export { ApiEndpoint, type ApiEndpointProps } from "./api-endpoint";
export { ApiParameters, type ApiParametersProps, type ApiParameter, type ApiParameterIn } from "./api-parameters";
export { ApiRequest, type ApiRequestProps } from "./api-request";
export { ApiResponse, type ApiResponseProps } from "./api-response";
export {
  ApiSchema,
  PropertyTable,
  EnumTable,
  type ApiSchemaProps,
  type SchemaNode,
  type PropertyTableProps,
  type PropertyRow,
  type EnumTableProps,
  type EnumRow,
} from "./api-schema";
