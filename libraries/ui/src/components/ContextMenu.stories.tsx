import type { Meta } from "@storybook/react";
import type { ComponentType, HTMLAttributes } from "react";
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
        <MyTrigger {...props} />
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent>
          <FileContextMenu label={props.label} />
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

function MyTrigger({
  label,
  ...rest
}: { label: string } & HTMLAttributes<HTMLLIElement>) {
  return <li {...rest}>{label}</li>;
}

export const HOC = {
  render: createExample(withContextMenu(MyTrigger, FileContextMenu)),
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

function createExample(Item: ComponentType<{ label: string }>) {
  return function ContextMenuExample() {
    return (
      <ul>
        <h1>Right click one of these:</h1>
        <Item label="One" />
        <Item label="Two" />
        <Item label="Three" />
      </ul>
    );
  };
}

function FileContextMenu({ label }: { label: string }) {
  return (
    <div style={{ background: "skyblue", color: "black", padding: 12 }}>
      Menu for {label}
      <ContextMenuItem>Click me to make a selection</ContextMenuItem>
    </div>
  );
}
