import type { Meta, StoryObj } from "@storybook/react";
import { withState } from "./withState";
import { NumberField } from "@yas/ui";

export default {
  component: NumberField,
  decorators: [withState],
} satisfies Meta<typeof NumberField>;

export const Default: StoryObj<typeof NumberField> = {
  args: {
    label: "NumberField",
  },
};
