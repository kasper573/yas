import type { Meta, StoryObj } from "@yas/test/storybook";
import { keysOf, mapValues, tokens } from "@yas/design-tokens";
import type { ReactNode } from "react";
import { Fragment, createElement } from "react";
import { withPDFViewer } from "../devtools/withPDFViewer";
import { View, Text } from "./components/react-pdf";

export default {
  component: Text,
  tags: ["autodocs"],
  decorators: [withPDFViewer()],
} satisfies Meta<typeof Text>;

export const Variants: StoryObj = {
  render() {
    return (
      <View sx={{ textAlign: "center" }}>
        {keysOf(tokens.typography).map((name) => (
          <Text key={name} sx={{ typography: name }}>
            {name}
          </Text>
        ))}
      </View>
    );
  },
};

export const FontFaces: StoryObj = {
  render() {
    return (
      <View sx={{ textAlign: "center" }}>
        {Object.values(
          mapValues(tokens.fontFaces, (faces, fontFamily) => (
            <Fragment key={fontFamily}>
              {faces.map(({ fontStyle, fontWeight }) => (
                <Text
                  key={fontFamily}
                  style={{
                    fontFamily,
                    fontStyle,
                    fontWeight,
                  }}
                >
                  {fontFamily} {fontStyle} {fontWeight}
                </Text>
              ))}
            </Fragment>
          )),
        )}
      </View>
    );
  },
};

export const NestedFontFaces: StoryObj = {
  render() {
    return (
      <View sx={{ textAlign: "center" }}>
        {Object.values(
          mapValues(tokens.fontFaces, (faces, fontFamily) => (
            <Text key={fontFamily} style={{ fontFamily }}>
              {faces.reduce(
                (content, { fontStyle, fontWeight }) => (
                  <>
                    {content}{" "}
                    <Text style={{ fontStyle, fontWeight }}>
                      ({fontStyle} {fontWeight})
                    </Text>
                  </>
                ),
                fontFamily as ReactNode,
              )}
            </Text>
          )),
        )}
      </View>
    );
  },
};

export const NestedVariants: StoryObj = {
  render() {
    return keysOf(tokens.typography)
      .toReversed()
      .reduce(
        (content, typography) => (
          <Text sx={{ typography }}>
            {typography} {content}
          </Text>
        ),
        createElement(Fragment),
      );
  },
};
