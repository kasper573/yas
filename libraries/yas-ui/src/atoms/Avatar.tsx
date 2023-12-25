import { styled } from "@yas/style";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { avatar } from "./Avatar.css";

export const Avatar = styled(AvatarImpl, avatar);

type AvatarImplProps =
  | Omit<ImgHTMLAttributes<HTMLImageElement>, "children">
  | Omit<HTMLAttributes<HTMLDivElement>, "src">;

function AvatarImpl(props: AvatarImplProps) {
  const Component = "src" in props ? "img" : "div";
  return <Component {...props} />;
}
