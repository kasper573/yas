import type { Meta, StoryObj } from "@yas/test/storybook";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

export default {
  component: () => null, // If we don't do this then storybook will somehow replace the ErrorBoundary with their own
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>;

export const Default: StoryObj<typeof ErrorBoundary> = {
  args: {
    enabled: true,
    FallbackComponent: ({ error }) =>
      "This is a fallback component. Error: " + error.message,
  },
  render(props) {
    return (
      <ErrorBoundary {...props}>
        <ProblematicComponent />
      </ErrorBoundary>
    );
  },
};

function ProblematicComponent(): ReactNode {
  const [showError, setShowError] = useState(false);
  useLayoutEffect(() => setShowError(true), []);

  if (showError) {
    throw new Error("I am a problematic component");
  }

  return null;
}
