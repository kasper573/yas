import type { Decorator } from "@storybook/react";
import type { ComponentProps } from "react";
import { PDFViewer, Document, Page } from "@yas/pdf";

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
