import { ChevronDownIcon, ChevronRightIcon } from "@yas/icons";
import { styled } from "@yas/style";
import type { HTMLAttributes } from "react";
import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
  forwardRef,
} from "react";
import { useUncontrolledFallback } from "@yas/hooks";
import * as styles from "./TreeView.css";

interface TreeViewProps extends Partial<TreeViewContextValue> {
  children?: TreeChildren;
}

export function TreeView({ children, ...rest }: TreeViewProps) {
  const contextValue = useUncontrolledFallback(
    rest,
    "expandedNodeIds",
    "onExpandedChanged",
    [],
  );

  return (
    <TreeViewContext.Provider value={{ ...contextDefaults, ...contextValue }}>
      {children}
    </TreeViewContext.Provider>
  );
}

const contextDefaults: TreeViewContextValue = {
  defaultCollapseIcon: <ChevronRightIcon />,
  defaultExpandIcon: <ChevronDownIcon />,
  expandedNodeIds: [],
};

const TreeViewContext = createContext<TreeViewContextValue>(contextDefaults);

const TreeItemImpl = forwardRef<HTMLDivElement, TreeItemProps>(
  function TreeItemImpl(
    { icon, nodeId, label, children, ...listItemProps },
    ref,
  ) {
    const {
      expandedNodeIds,
      defaultExpandIcon,
      defaultCollapseIcon,
      onExpandedChanged,
    } = useContext(TreeViewContext);

    const expanded = expandedNodeIds.includes(nodeId);
    const defaultIcon = expanded ? defaultExpandIcon : defaultCollapseIcon;

    function toggleExpanded() {
      onExpandedChanged?.(
        expanded
          ? expandedNodeIds.filter((id) => id !== nodeId)
          : [...expandedNodeIds, nodeId],
      );
    }

    return (
      <li {...listItemProps}>
        <div className={styles.labelAndIcon} onClick={toggleExpanded} ref={ref}>
          {icon ?? defaultIcon}
          <span className={styles.label}>{label}</span>
        </div>
        {children ? (
          <ul className={styles.list({ expanded })}>{children}</ul>
        ) : null}
      </li>
    );
  },
);

export const TreeItem = styled(TreeItemImpl, styles.listItem);

interface TreeViewContextValue {
  defaultCollapseIcon: ReactNode;
  defaultExpandIcon: ReactNode;
  expandedNodeIds: NodeId[];
  onExpandedChanged?: (updatedNodeIds: NodeId[]) => void;
}

type NodeId = string | number;

type TreeChildren = ReactElement<TreeItemProps> | ReactElement<TreeItemProps>[];

interface TreeItemProps extends HTMLAttributes<HTMLLIElement> {
  nodeId: NodeId;
  label: ReactNode;
  icon?: ReactNode;
  children?: TreeChildren;
}
