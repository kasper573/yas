import type { Meta, StoryObj } from "@storybook/react";
import {
  NavLink,
  RouterProvider,
  createRootRoute,
  createRouter,
} from "@yas/router";

export default {
  component: NavLink,
} satisfies Meta;

export const Default: StoryObj<Meta<typeof NavLink>> = {
  args: {
    children: "I am a NavLink",
  },
  render: (props) => (
    <RouterProvider
      router={createRouter({
        routeTree: createRootRoute({
          // Looks a a bit weird, but works well enough. We need a router to render a NavLink.
          // So simply using a fallback component is a minimal yet odd way to render something.
          notFoundComponent: () => <NavLink {...props} />,
        }),
      })}
    />
  ),
};
