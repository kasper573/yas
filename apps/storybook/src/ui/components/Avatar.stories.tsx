import type { Meta, StoryObj } from "@storybook/react";
import { PieChartIcon } from "@yas/icons";
import { Avatar } from "@yas/ui";

export default {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export const Src: StoryObj<Meta<typeof Avatar>> = {
  args: { src: "https://api.dicebear.com/8.x/bottts/svg?seed=test" },
};

export const Children: StoryObj<Meta<typeof Avatar>> = {
  args: { children: <PieChartIcon /> },
};
