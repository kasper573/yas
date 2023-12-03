import type { ReactNode } from "react";
import Tabs from "@theme/Tabs";
import DocusaurusTabItem from "@theme/TabItem";
import * as styles from "./Split.css";

export interface SplitProps {
  children: [ReactNode, ReactNode];
  names: [ReactNode, ReactNode];
  flex?: [number | undefined, number | undefined];
}

export function Split({
  children: [left, right],
  names: [leftName, rightName],
  flex: [leftFlex, rightFlex] = [1, undefined],
}: SplitProps) {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col} style={{ flex: leftFlex }}>
          {left}
        </div>
        <div className={styles.col} style={{ flex: rightFlex }}>
          {right}
        </div>
      </div>

      <div className={styles.tabs}>
        <Tabs>
          <TabItem value="left" label={leftName} default>
            {left}
          </TabItem>
          <TabItem value="right" label={rightName}>
            {right}
          </TabItem>
        </Tabs>
      </div>
    </>
  );
}

// This assertion could possibly be removed when docusaurus is updated to stable version 3
const TabItem = DocusaurusTabItem as (props: {
  value?: ReactNode;
  label?: ReactNode;
  default?: boolean;
  children?: ReactNode;
}) => JSX.Element;
