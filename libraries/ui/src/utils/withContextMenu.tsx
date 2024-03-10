import { useState, type ComponentType, type HTMLAttributes } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";

export function withContextMenu<
  TriggerProps extends TriggerLikeProps,
  ContextMenuProps,
>(
  Trigger: ComponentType<TriggerProps>,
  deriveProps: (props: TriggerProps) => ContextMenuProps,
  defaultContextMenu?: ComponentType<ContextMenuProps>,
) {
  return function ContextMenuTrigger(
    props: TriggerProps & ContextMenuTriggerProps<ContextMenuProps>,
  ) {
    const { contextMenu: ContextMenu = defaultContextMenu } = props;
    const [isOpen, setOpen] = useState(false);
    return (
      <Popover
        open={isOpen}
        onOpenChange={(didOpen) => !didOpen && setOpen(false)}
      >
        <PopoverTrigger asChild>
          <Trigger
            {...props}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
          />
        </PopoverTrigger>
        <PopoverContent align="end" side="right">
          {ContextMenu ? (
            <ContextMenu
              {...(deriveProps(props) as ContextMenuProps &
                JSX.IntrinsicAttributes)}
            />
          ) : null}
        </PopoverContent>
      </Popover>
    );
  };
}

interface TriggerLikeProps
  extends Pick<HTMLAttributes<HTMLElement>, "onContextMenu"> {}

export interface ContextMenuTriggerProps<ContextMenuProps> {
  contextMenu?: ComponentType<ContextMenuProps>;
}
