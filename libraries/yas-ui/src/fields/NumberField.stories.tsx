import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { NumberField } from "./NumberField";

export default {
  title: "fields/NumberField",
  component: NumberField,
  tags: ["autodocs"],
} satisfies Meta<typeof NumberField>;

export const Default: StrictStoryObj<typeof NumberField> = {
  args: {
    label: "NumberField",
  },
  render(props) {
    const [value, setValue] = useState<number>();
    return <NumberField {...props} value={value} onChange={setValue} />;
  },
};
