import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { SingleSelectField } from "./SingleSelectField";

export default {
  title: "SingleSelectField",
  component: SingleSelectField,
  tags: ["autodocs"],
} satisfies Meta<typeof SingleSelectField<number>>;

export const Default: StrictStoryObj<typeof SingleSelectField<number>> = {
  args: {
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
      { label: "Option 3", value: 3 },
    ],
  },
  render(props) {
    const [value, setValue] = useState<number>();
    return <SingleSelectField {...props} value={value} onChange={setValue} />;
  },
};
