import { styled } from "@yas/style";
import type { ComponentProps } from "react";
import { buttonRecipe } from "./Button.css";

export type ButtonProps = ComponentProps<typeof Button>;
export const Button = styled("button", buttonRecipe);
