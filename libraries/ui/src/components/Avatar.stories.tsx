import type { Meta, StoryObj } from "@yas/storybook";
import { PieChartIcon } from "@yas/icons";
import exampleAvatarUrl from "../../assets/example-avatar.png";
import { Avatar } from "./Avatar";

export default {
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export const Src: StoryObj<Meta<typeof Avatar>> = {
  args: { src: exampleAvatarUrl },
};

export const Children: StoryObj<Meta<typeof Avatar>> = {
  args: { children: <PieChartIcon /> },
};
