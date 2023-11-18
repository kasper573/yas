import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

export default {
  title: "atoms/Text",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export const SingleLine: StoryObj<Meta<typeof Text>> = {
  args: { children: "Hello World" },
};

export const Paragraphs: StoryObj<Meta<typeof Text>> = {
  args: {
    paragraph: true,
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl vitae aliquam ultricies, nunc nisl aliquet nunc, vitae aliq.",
  },
  render(props) {
    return (
      <>
        <Text {...props} />
        <Text {...props} />
        <Text {...props} />
      </>
    );
  },
};
