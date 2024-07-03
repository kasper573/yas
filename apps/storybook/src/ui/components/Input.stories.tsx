import type { Meta, StoryObj } from "@storybook/react";
import { InputArea, InputRoot, InputSlot } from "@yas/ui";

export default {
  component: InputShowcase,
} satisfies Meta<typeof InputShowcase>;

export const Default: StoryObj = {};

function InputShowcase() {
  return (
    <InputRoot>
      <InputSlot>Slot Before</InputSlot>
      <InputArea placeholder="InputArea" />
      <InputSlot>Slot After</InputSlot>
    </InputRoot>
  );
}
