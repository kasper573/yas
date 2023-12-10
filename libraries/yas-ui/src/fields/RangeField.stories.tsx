import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import type { Range } from "./RangeField";
import { RangeField } from "./RangeField";

export default {
  title: "fields/RangeField",
  component: RangeField,
  tags: ["autodocs"],
} satisfies Meta<typeof RangeField>;

export const Default: StrictStoryObj<typeof RangeField> = {
  args: {
    min: 0,
    max: 10,
    label: "RangeField",
  },
  render(props) {
    const [value, setValue] = useState<Range>();
    return <RangeField {...props} value={value} onChange={setValue} />;
  },
};
