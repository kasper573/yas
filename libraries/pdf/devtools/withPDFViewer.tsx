import type { Decorator } from "@yas/test/storybook";
import type { ComponentProps } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Document } from "../src/components/react-pdf";
import { Page } from "../src/components/react-pdf";

/**
 * Convenience storybook decorator that wraps the component in a PDFViewer, Document, and Page.
 */
export function withPDFViewer(pageProps?: ComponentProps<typeof Page>) {
  const decorator: Decorator = (Story, context) => {
    return (
      <PDFViewer width="100%" height="700px">
        <Document>
          <Page size="A4" {...pageProps}>
            <Story {...context} />
          </Page>
        </Document>
      </PDFViewer>
    );
  };

  return decorator;
}
