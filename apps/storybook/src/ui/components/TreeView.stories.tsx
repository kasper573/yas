import type { Meta, StoryObj } from "@storybook/react";
import { TreeItem, TreeView } from "@yas/ui";

export default {
  component: TreeView,
} satisfies Meta<typeof TreeView>;

export const Uncontrolled: StoryObj<Meta<typeof TreeView>> = {
  args: {
    children: (
      <>
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="@yas/ui">
            <TreeItem nodeId="8" label="index.ts" />
          </TreeItem>
        </TreeItem>
      </>
    ),
  },
};

export const Controlled: StoryObj<Meta<typeof TreeView>> = {
  args: {
    expandedNodeIds: ["1", "5"],
    children: (
      <>
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="@yas/ui">
            <TreeItem nodeId="8" label="index.ts" />
          </TreeItem>
        </TreeItem>
      </>
    ),
  },
};
