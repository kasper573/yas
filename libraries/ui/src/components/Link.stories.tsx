import type { Meta, StoryObj } from "@yas/test/storybook";
import { RouterProvider, createRootRoute, createRouter } from "@yas/router";
import type { ComponentProps } from "react";
import { Link } from "./Link";

export default {
  component: LinkWithProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export const Default: StoryObj<Meta<typeof Link>> = {
  args: { children: "Click me" },
};

function LinkWithProvider(props: ComponentProps<typeof Link>) {
  const testRouter = createRouter({
    routeTree: createRootRoute({
      notFoundComponent: () => <Link {...props} />,
    }),
  });
  return <RouterProvider router={testRouter} />;
}
