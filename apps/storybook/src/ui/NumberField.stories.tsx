import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "@yas/ui";
import { withState } from "./withState";

export default {
  component: NumberField,
  decorators: [withState],
} satisfies Meta<typeof NumberField>;

export const Default: StoryObj<typeof NumberField> = {
  args: {
    label: "NumberField",
  },
};
