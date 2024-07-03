import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LoadingButton } from "@yas/ui";

export default {
  component: LoadingButton,
} satisfies Meta<typeof LoadingButton>;

const range = [1, 2, 3];

export const Controlled: StoryObj<Meta<typeof LoadingButton>> = {
  args: {
    children: <>Click me</>,
  },
  render(props) {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
            />
            isLoading
          </label>
        </div>
        <LoadingButton {...props} isLoading={isLoading} />
      </>
    );
  },
};

export const OnClickPromise: StoryObj<Meta<typeof LoadingButton>> = {
  args: {
    onClick: () => new Promise((resolve) => setTimeout(resolve, 1000)),
    children: <>Click me</>,
  },
};
