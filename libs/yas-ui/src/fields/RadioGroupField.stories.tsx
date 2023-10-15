import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { RadioGroupField } from "./RadioGroupField";

export default {
  title: "RadioGroupField",
  component: RadioGroupField,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupField<number>>;

export const Default: StrictStoryObj<typeof RadioGroupField<number>> = {
  args: {
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
  render(props) {
    const [value, setValue] = useState<number>();
    return <RadioGroupField {...props} value={value} onChange={setValue} />;
  },
};
