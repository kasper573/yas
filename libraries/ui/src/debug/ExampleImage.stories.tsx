import type { Meta, StoryObj } from "@yas/storybook";
import { ExampleImage } from "./ExampleImage";

export default {
  component: ExampleImage,
} satisfies Meta<typeof ExampleImage>;

export const Default: StoryObj<Meta<typeof ExampleImage>> = {};
