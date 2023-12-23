import { styled } from "@yas/style";
import { Stack } from "@yas/ui";
import { outline } from "./Shared.css";

export const rowGap = "#3" as const;
export const columnGap = "#5" as const;

export const Outlined = styled("div").attrs({ className: outline });

export const CommonStack = styled(Stack).attrs({ columnGap, rowGap });
