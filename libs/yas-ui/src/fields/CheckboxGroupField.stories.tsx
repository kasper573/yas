import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { CheckboxGroupField } from "./CheckboxGroupField";

export default {
  title: "fields/CheckboxGroupField",
  component: CheckboxGroupField,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxGroupField<number>>;

export const Default: StrictStoryObj<typeof CheckboxGroupField<number>> = {
  args: {
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
  render(props) {
    const [value, setValue] = useState<number[]>();
    return <CheckboxGroupField {...props} value={value} onChange={setValue} />;
  },
};
