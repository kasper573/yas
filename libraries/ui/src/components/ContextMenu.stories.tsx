import type { Meta } from "@storybook/react";
import type { ComponentProps, ComponentType } from "react";
import { TreeItem, TreeView } from "./TreeView";
import { Paper } from "./Paper";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
  withContextMenu,
} from "./ContextMenu";

export default {
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const Component = {
  render: createExample((props) => (
    <ContextMenuRoot>
      <ContextMenuTrigger asChild>
        <TreeItem {...props} />
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent>
          <FileContextMenu nodeId={props.nodeId} />
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenuRoot>
  )),
  parameters: {
    docs: {
      description: {
        story: "Manual component composition using the ContextMenu primitives.",
      },
    },
  },
};

export const HOC = {
  render: createExample(
    withContextMenu(
      TreeItem,
      ({ nodeId }) => ({ nodeId }),
      FileContextMenu,
    ) as typeof TreeItem,
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using the withContextMenu HOC to augment an existing trigger component with a contextMenu " +
          "property that automatically renders a simple context menu when the component is right-clicked.",
      },
    },
  },
};

function createExample(File: ComponentType<ComponentProps<typeof TreeItem>>) {
  return function ContextMenuExample() {
    return (
      <TreeView>
        <File nodeId="1" label="Applications">
          <File nodeId="2" label="Calendar" />
        </File>
        <File nodeId="5" label="Documents">
          <File nodeId="10" label="OSS" sx={{ color: "error.base.main" }} />
          <File nodeId="6" label="@yas/ui">
            <File nodeId="8" label="index.ts" />
          </File>
        </File>
      </TreeView>
    );
  };
}

function FileContextMenu({ nodeId }: { nodeId: string | number }) {
  return (
    <Paper>
      Menu for {nodeId}
      <ContextMenuItem>Click me to make a selection</ContextMenuItem>
    </Paper>
  );
}
