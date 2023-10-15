import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { FormControlLabel } from "./FormControlLabel";

export default {
  title: "form/FormControlLabel",
  component: FormControlLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof FormControlLabel>;

export const Default: StrictStoryObj<typeof FormControlLabel> = {
  args: {
    children: "Label",
    control: (id) => <input id={id} />,
  },
};
