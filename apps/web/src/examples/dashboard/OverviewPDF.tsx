import { Document, Page, Text } from "@yas/pdf";

export function OverviewPDF() {
  return (
    <Document>
      <Page>
        <Text>Overview</Text>
        <Text>
          This is just a POC pdf file that showcases a react based PDF
          integration that is using the same design system as the rest of the
          codebase.
        </Text>
      </Page>
    </Document>
  );
}
