import type { Meta } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { TextField } from "./TextField";

export default {
  title: "form/TextField",
  component: TextFieldWithState,
  tags: ["autodocs"],
} satisfies Meta<typeof TextFieldWithState>;

export const Default: StrictStoryObj<typeof TextField> = {
  args: {
    label: "TextField",
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

export const WithError: StrictStoryObj<typeof TextField> = {
  args: {
    errors: ["Something went wrong"],
  },
};

export const Clearable: StrictStoryObj<typeof TextField> = {
  args: {
    clearable: true,
  },
};

export const Loading: StrictStoryObj<typeof TextField> = {
  args: {
    isLoading: true,
  },
};

function TextFieldWithState(props: ComponentProps<typeof TextField>) {
  const [value, setValue] = useState(props.value);
  return <TextField {...props} value={value} onChange={setValue} />;
}
