import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { BaseField } from "./BaseField";

export default {
  title: "form/BaseField",
  component: BaseField,
  tags: ["autodocs"],
} satisfies Meta<typeof BaseField>;

export const Children: StrictStoryObj<typeof BaseField> = {
  args: {
    label: <h4>Label</h4>,
    children: <div>Children</div>,
  },
};

export const Control: StrictStoryObj<typeof BaseField> = {
  args: {
    label: <h4>Label</h4>,
    control: (id) => <input id={id} />,
  },
};

export const Errors: StrictStoryObj<typeof BaseField> = {
  args: {
    label: <h4>Label</h4>,
    errors: ["Error 1", "Error 2"],
    children: <div>Children</div>,
  },
};
