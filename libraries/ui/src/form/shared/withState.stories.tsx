import type { Meta } from "@yas/test/storybook";
import { withState } from "./withState";

export default {
  component: InputField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta;

export const Default = {};

function InputField(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
