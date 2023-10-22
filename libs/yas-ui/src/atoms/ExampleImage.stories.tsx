import type { Meta, StoryObj } from "@storybook/react";
import { ExampleImage } from "./ExampleImage";

export default {
  title: "atoms/ExampleImage",
  component: ExampleImage,
  tags: ["autodocs"],
} satisfies Meta<typeof ExampleImage>;

export const Default: StoryObj<Meta<typeof ExampleImage>> = {};
