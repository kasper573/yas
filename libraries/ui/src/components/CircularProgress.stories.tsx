import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

export default {
  component: CircularProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof CircularProgress>;

export const Default: StoryObj<Meta<typeof CircularProgress>> = {};
