import type { ComponentProps, ComponentType } from "react";
import type { Meta } from "@storybook/react";

export type StrictStoryObj<T> = T extends ComponentType<infer _>
  ? Omit<Meta<T>, "args"> &
      (HasRequiredProps<ComponentProps<T>> extends true
        ? { args: ComponentProps<T> }
        : { args?: ComponentProps<T> })
  : never;

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type HasRequiredProps<T> = RequiredKeys<T> extends never ? false : true;
