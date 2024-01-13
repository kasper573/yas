import type { Meta, StoryObj } from "@storybook/react";
import { Void } from "./Void";

const meta = {
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <div style={styles.stack}>
        Hello
        <Void>
          <div style={styles.void}>Void</div>
        </Void>
        World
      </div>
    );
  },
};

const styles = {
  stack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  void: {
    background: "red",
    padding: 12,
    fontSize: 24,
  },
} as const;
