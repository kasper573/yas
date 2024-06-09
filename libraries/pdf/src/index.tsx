import { registerDesignTokenFontsWithReactPDF } from "./utils/registerFonts";

// Some of the react-pdf API can be used as-is
export {
  renderToBuffer,
  renderToFile,
  renderToStream,
  usePDF,
  pdf,
  BlobProvider,
  PDFViewer,
} from "@react-pdf/renderer";

// We don't use the components from react-pdf as-is, since they allow unconstrained styles.
// We want to enforce our design tokens, so we wrap them using our `styled` function.
export * from "./components/react-pdf";

// We have some custom components that are not part of react-pdf
export * from "./components/custom/Dock";
export * from "./components/custom/Row";
export * from "./components/custom/Column";
export * from "./components/custom/Divider";

// We expose some utils to aid in defining custom compositions
export type * from "./utils/resolvePDFStyle";
export * from "./utils/createComponent";
export * from "./utils/resolveVariantStyle";

registerDesignTokenFontsWithReactPDF();
