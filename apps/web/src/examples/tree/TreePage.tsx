import { TreeView, TreeItem, withContextMenu, Paper } from "@yas/ui";

export default function TreePage() {
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
}

const File = withContextMenu(TreeItem, FileContextMenu);

function FileContextMenu({ nodeId }: { nodeId: string | number }) {
  return <Paper>Menu for {nodeId}</Paper>;
}
