import type { Meta } from "@storybook/react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { TextField } from "./TextField";

export default {
  title: "fields/TextField",
  component: TextField,
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export const Default: StrictStoryObj<typeof TextField> = {
  render(props) {
    const [value, setValue] = useState<string>();
    return <TextField {...props} value={value} onChange={setValue} />;
  },
};
