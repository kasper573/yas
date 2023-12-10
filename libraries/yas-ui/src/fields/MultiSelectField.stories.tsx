import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { MultiSelectField } from "./MultiSelectField";

export default {
  title: "fields/MultiSelectField",
  component: MultiSelectField,
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelectField<number>>;

export const Default: StrictStoryObj<typeof MultiSelectField<number>> = {
  args: {
    label: "MultiSelectField",
    emptyOptionText: "Select something...",
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
      { label: "Option 4", value: 4 },
    ],
  },
  render(props) {
    const [value, setValue] = useState<number[]>();
    return <MultiSelectField {...props} value={value} onChange={setValue} />;
  },
};
