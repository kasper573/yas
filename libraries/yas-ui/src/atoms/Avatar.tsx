import { styled } from "@yas/style";
import type { ImgHTMLAttributes, ReactNode } from "react";
import { avatar } from "./Avatar.css";

export const Avatar = styled(AvatarImpl, avatar);

type AvatarImplProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "children" | "src"
> & {
  src?: string;
  children?: ReactNode;
};

function AvatarImpl(props: AvatarImplProps) {
  const Component = "src" in props ? "img" : "div";
  return <Component {...props} />;
}
