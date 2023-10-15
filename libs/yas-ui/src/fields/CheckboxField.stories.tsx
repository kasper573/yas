import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { CheckboxField } from "./CheckboxField";

export default {
  title: "CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export const Default: StrictStoryObj<typeof CheckboxField> = {};
