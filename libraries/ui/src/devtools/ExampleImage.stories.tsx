import type { Meta, StoryObj } from "@yas/test/storybook";
import { ExampleImage } from "./ExampleImage";

export default {
  component: ExampleImage,
  tags: ["autodocs"],
} satisfies Meta<typeof ExampleImage>;

export const Default: StoryObj<Meta<typeof ExampleImage>> = {};
