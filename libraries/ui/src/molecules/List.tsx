import { styled } from "@yas/style";
import type { ComponentProps, ReactNode } from "react";
import { Stack } from "../layout/Stack";
import { Text } from "../components/Text";
import {
  list,
  item,
  icon,
  secondaryContent,
  text,
  textEllipsis,
} from "./List.css";

export const List = styled("ul", list);

export const ListItem = styled("li", item);

export const ListItemIcon = styled("div").attrs({ className: icon });

export const ListItemText = styled(
  ({
    primary,
    secondary,
    ...props
  }: ComponentProps<typeof Stack> & {
    primary?: ReactNode;
    secondary?: ReactNode;
  }) => (
    <Stack {...props}>
      {primary ? <ListItemPrimaryText>{primary}</ListItemPrimaryText> : null}
      {secondary ? (
        <ListItemSecondaryText>{secondary}</ListItemSecondaryText>
      ) : null}
    </Stack>
  ),
  text,
);

export const ListItemPrimaryText = styled(Text, textEllipsis).attrs({
  intent: "h5",
});

export const ListItemSecondaryText = styled(Text, textEllipsis).attrs({
  intent: "caption",
});

export const ListItemSecondaryContent = styled("div", secondaryContent);
