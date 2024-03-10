import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { styled } from "@yas/style";
import { type ComponentType, type HTMLAttributes, createElement } from "react";

export const ContextMenuRoot = RadixContextMenu.Root;
export const ContextMenuTrigger = RadixContextMenu.Trigger;
export const ContextMenuContent = styled(RadixContextMenu.Content);
export const ContextMenuPortal = RadixContextMenu.Portal;
export const ContextMenuItem = styled(RadixContextMenu.Item);

/**
 * Optional utility for enhancing an existing component as a context menu trigger.
 */
export function withContextMenu<TriggerProps extends TriggerLikeProps>(
  Trigger: ComponentType<TriggerProps>,
  defaultContextMenu?: ComponentType<TriggerProps>,
) {
  return function WithContextMenu(
    props: TriggerProps & {
      contextMenu?: ComponentType<TriggerProps>;
    },
  ) {
    const menuComponent = props.contextMenu ?? defaultContextMenu;
    const menuElement = menuComponent
      ? createElement(menuComponent, props)
      : null;

    return (
      <ContextMenuRoot>
        <ContextMenuTrigger asChild>
          <Trigger {...props} />
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent>{menuElement}</ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenuRoot>
    );
  };
}

interface TriggerLikeProps
  extends Pick<HTMLAttributes<HTMLElement>, "onContextMenu"> {}
