import type { Meta, StoryObj } from "@storybook/react";
import { View, Image, Text, styled } from "@yas/pdf";
import { withPDFViewer } from "./withPDFViewer";

const meta = {
  component: PDFShowcase,

  decorators: [withPDFViewer()],
  parameters: {
    docs: {
      description: {
        story:
          "@yas/pdf is an encapsulation of [react-pdf](https://react-pdf.org/) that's been integrated with `@yas/design-tokens`",
      },
    },
  },
} satisfies Meta<typeof PDFShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function PDFShowcase() {
  return (
    <>
      <Container>
        <Section>
          <Text>Foobar</Text>
          <Image src="https://picsum.photos/200/200?random=1" />
        </Section>
        <Section>
          <Text sx={{ flex: 1 }}>Hello World</Text>
        </Section>
      </Container>
      <PageNumber
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </>
  );
}

const Container = styled(View, {
  sx: {
    flexDirection: "column",
    height: "100%",
  },
});

const Section = styled(View, {
  sx: {
    margin: "l",
    padding: "l",
    flex: 1,
  },
});

const PageNumber = styled(Text, {
  sx: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "surface.face",
  },
});
