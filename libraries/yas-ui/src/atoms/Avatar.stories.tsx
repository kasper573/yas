import type { Meta, StoryObj } from "@storybook/react";
import { PieChartIcon } from "@yas/icons";
import exampleAvatarUrl from "../../assets/example-avatar.png";
import { Avatar } from "./Avatar";

export default {
  title: "atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export const Src: StoryObj<Meta<typeof Avatar>> = {
  args: { src: exampleAvatarUrl },
};

export const Children: StoryObj<Meta<typeof Avatar>> = {
  args: { children: <PieChartIcon /> },
};
