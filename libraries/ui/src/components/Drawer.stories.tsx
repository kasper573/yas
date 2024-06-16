import { within, userEvent, waitFor } from "@yas/test/storybook";
import type { Meta, StoryObj } from "@yas/test/storybook";
import type { ComponentType } from "react";
import { styled } from "@yas/style";
import { useModal } from "../hooks/useModal";
import { Drawer as DrawerImpl, BaseDrawer } from "./Drawer";

export default {
  component: BaseDrawer,
  tags: ["autodocs"],
} satisfies DrawerMeta;

type DrawerMeta = Meta<typeof BaseDrawer>;

export const OpenBaseDrawer: StoryObj<DrawerMeta> = {
  render: (props) => (
    <FixedSizeContainer>
      <BaseDrawer {...props}>
        <TestContent />
      </BaseDrawer>
    </FixedSizeContainer>
  ),
};

export const CanSpawnDrawer: StoryObj = {
  args: { open: true },
  render: withFixedSize(() => {
    const showDrawer = useModal(Drawer);
    return (
      <button onClick={() => showDrawer({ children: <TestContent /> })}>
        Spawn drawer
      </button>
    );
  }),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByText("Spawn drawer"));
    const drawer = canvas.getByTestId(drawerTextId);
    await waitFor(function notAnimating() {
      return !drawer.getAnimations().length;
    });
  },
};

export const CanCloseSpawnedDrawer: StoryObj = {
  render: withFixedSize(() => {
    const showDrawer = useModal(({ resolve, ...props }) => (
      <Drawer {...props}>
        <TestContent>
          <button onClick={() => resolve()}>Close</button>
        </TestContent>
      </Drawer>
    ));
    return <button onClick={() => showDrawer()}>Spawn drawer</button>;
  }),

  play: async (context) => {
    const canvas = within(context.canvasElement);
    await CanSpawnDrawer.play?.(context);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(function notPresent() {
      return !canvas.queryByTestId(drawerTextId);
    });
  },
};

function withFixedSize<Props extends object>(Component: ComponentType<Props>) {
  return function Container(props: Props) {
    return (
      <FixedSizeContainer>
        <Component {...props} />
      </FixedSizeContainer>
    );
  };
}

const drawerTextId = "drawer";

// Since drawers are rendered overlayed it has no inline size, so we need to
// provide some minimum space for the docs preview in storybook to look good
const FixedSizeContainer = styled("div").attrs({
  style: {
    width: 300,
    height: 300,
  },
});

const Drawer = styled(DrawerImpl).attrs({
  "data-testid": drawerTextId,
} as Record<string, unknown>);

const TestContent = styled("div").attrs({
  children: "Drawer content",
  style: {
    width: 200,
    height: 200,
    padding: 24,
    textAlign: "center",
  },
});
