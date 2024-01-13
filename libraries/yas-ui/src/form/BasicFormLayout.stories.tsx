import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { BasicFormLayout } from "./BasicFormLayout";

export default {
  component: BasicFormLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof BasicFormLayout>;

export const Default: StrictStoryObj<typeof BasicFormLayout> = {
  args: {
    fields: {
      "field-1": () => <div>Field 1</div>,
      "field-2": () => <div>Field 2</div>,
      "field-3": () => <div>Field 3</div>,
    },
    generalErrors: ["General error 1", "General error 2"],
    fieldErrors: {},
    fieldValues: {},
    reset: () => {},
    handleSubmit: () => {},
  },
};
