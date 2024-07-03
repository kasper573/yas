import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "@yas/ui";

export default {
  component: PopoverShowcase,
} satisfies Meta;

export const Default: StoryObj = {};

function PopoverShowcase() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open</button>
      </PopoverTrigger>
      <PopoverContent
        style={{ padding: 12, background: "gray", color: "black" }}
      >
        Content
      </PopoverContent>
    </Popover>
  );
}
