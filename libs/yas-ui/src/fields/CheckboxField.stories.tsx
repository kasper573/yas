import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { CheckboxField } from "./CheckboxField";

export default {
  title: "fields/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export const Default: StrictStoryObj<typeof CheckboxField> = {
  render(props) {
    const [checked, setChecked] = useState<boolean>();
    return <CheckboxField {...props} value={checked} onChange={setChecked} />;
  },
};
