import type { ReactNode } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./Split.module.css";

export interface SplitProps {
  children: [ReactNode, ReactNode];
  names: [ReactNode, ReactNode];
}

export function Split({
  children: [left, right],
  names: [leftName, rightName],
}: SplitProps) {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>{left}</div>
        <div className={styles.col}>{right}</div>
      </div>

      <div className={styles.tabs}>
        <Tabs>
          {/* @ts-expect-error Typescript doesn't seem to resolve the types for TabItem */}
          <TabItem value="left" label={leftName} default>
            {left}
          </TabItem>
          {/* @ts-expect-error Typescript doesn't seem to resolve the types for TabItem */}
          <TabItem value="right" label={rightName}>
            {right}
          </TabItem>
        </Tabs>
      </div>
    </>
  );
}
