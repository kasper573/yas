import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { useState } from "react";
import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CanClick: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    return (
      <>
        <Button onClick={() => setClicked(true)}>Click me</Button>
        {clicked && <p>Clicked!</p>}
      </>
    );
  },
  async play({ canvasElement }) {
    const button = await within(canvasElement).getByRole("button");
    await button.click();
    await within(canvasElement).findByText("Clicked!");
  },
};
