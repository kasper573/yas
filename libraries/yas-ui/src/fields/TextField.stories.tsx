import type { Meta } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { TextField } from "./TextField";

export default {
  title: "fields/TextField",
  component: TextFieldWithState,
  tags: ["autodocs"],
} satisfies Meta<typeof TextFieldWithState>;

export const Empty: StrictStoryObj<typeof TextField> = {};

export const Placeholder: StrictStoryObj<typeof TextField> = {
  args: {
    inputProps: {
      placeholder: "Placeholder",
    },
  },
};

export const WithDefaultValue: StrictStoryObj<typeof TextField> = {
  args: {
    value: "Default",
  },
};

function TextFieldWithState(props: ComponentProps<typeof TextField>) {
  const [value, setValue] = useState(props.value);
  return <TextField {...props} value={value} onChange={setValue} />;
}
