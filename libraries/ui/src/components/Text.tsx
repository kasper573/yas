import { styled } from "@yas/style";
import type { ComponentProps, ElementType } from "react";
import type { tokens } from "@yas/design-tokens";
import { textRecipe } from "./Text.css";

export type TextProps = ComponentProps<typeof Root>;
export function Text({
  intent = "body",
  children,
  ...rest
}: TextProps): JSX.Element {
  const Tag = textIntentToHtmlTag[intent] satisfies ElementType;
  return (
    <Root intent={intent} asChild {...rest}>
      <Tag>{children}</Tag>
    </Root>
  );
}

const Root = styled("span", textRecipe);

export const textIntentToHtmlTag = {
  body: "p",
  body2: "p",
  label: "strong",
  caption: "span",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} satisfies Record<keyof tokens.Typography, ElementType>;
