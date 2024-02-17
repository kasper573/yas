import type { Decorator } from "@storybook/react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { FieldProps } from "./types";

/**
 * Augments a component's story with stateful value and onChange properties.
 */
export const withState: Decorator = (Story, context) => {
  return (
    <StateProvider initialValue={context.args.value}>
      {(props) => (
        <Story
          {...context}
          args={{
            ...context.args,
            ...props,
          }}
        />
      )}
    </StateProvider>
  );
};

function StateProvider<Value>({
  children,
  initialValue,
}: StateProviderProps<Value>) {
  const [value, onChange] = useState(initialValue);
  return children?.({ value, onChange });
}

interface StateProviderProps<Value> {
  initialValue: Value;
  children?: (props: StatefulComponentProps<Value>) => ReactNode;
}

type StatefulComponentProps<Value> = Pick<
  FieldProps<Value>,
  "value" | "onChange"
>;
