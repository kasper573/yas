import type { Meta, StoryObj } from "@storybook/react";
import { Bounds } from "@yas/ui";

const meta = {
  component: BoundsExample,
} satisfies Meta<typeof BoundsExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function BoundsExample() {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        background: "green",
        overflow: "auto",
        resize: "both",
      }}
    >
      <Bounds>
        {(bounds) => (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(bounds, null, 2)}
          </div>
        )}
      </Bounds>
    </div>
  );
}
