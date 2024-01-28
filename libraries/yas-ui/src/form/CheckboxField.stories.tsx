import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { CheckboxField } from "./CheckboxField";
import { withState } from "./shared/withState";

export default {
  component: CheckboxField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export const Default: StrictStoryObj<typeof CheckboxField> = {
  args: {
    label: "CheckboxField",
  },
};
