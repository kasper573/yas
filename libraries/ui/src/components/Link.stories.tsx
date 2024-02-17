import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

export default {
  component: Link,
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export const Default: StoryObj<Meta<typeof Link>> = {
  args: { children: "Click me" },
};
