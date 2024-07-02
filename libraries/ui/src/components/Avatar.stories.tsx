import type { Meta, StoryObj } from "@yas/test/storybook";
import { PieChartIcon } from "@yas/icons";
import { Avatar } from "./Avatar";

export default {
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export const Src: StoryObj<Meta<typeof Avatar>> = {
  args: { src: "https://api.dicebear.com/8.x/bottts/svg?seed=test" },
};

export const Children: StoryObj<Meta<typeof Avatar>> = {
  args: { children: <PieChartIcon /> },
};
